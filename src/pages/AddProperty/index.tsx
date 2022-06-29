import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { nextTick } from 'process';
import { useLocation, useNavigate } from 'react-router-dom';
import WalletComponent, { Wallet } from '../../components/Wallet';

interface Validation {
  name: null | boolean;
}

interface Form {
  id: string;
  name: string;
  amount: number;
  background: string;
  positiveNumber: boolean;
}

function AddProperty() {
  // #region 기본 변수
  /**
   * router
   */
  const router = useNavigate();
  const location = useLocation();

  /** 수정모드 여부 */
  const [isEdit, setIsEdit] = useState(false);

  /** local storage 저장데이터 */
  const [storageData] = useState(localStorage.getItem('propertyData'));
  const storageJSON: Wallet[] = storageData ? JSON.parse(storageData) : [];

  /** validation pass 여부 */
  const [isPass, setIsPass] = useState(false);

  /**
   * form
   */
  const [form, setForm] = useState<Form>({
    id: '',
    name: '',
    amount: 0,
    background: 'mint',
    positiveNumber: true,
  });

  const [wallet, setWallet] = useState<Wallet>({
    id: '',
    name: '',
    amount: 0,
    background: 'mint',
  });

  const colors = [
    {
      name: 'mint',
      value: 'mint',
    },
    {
      name: 'green',
      value: 'green',
    },
    {
      name: 'brightmint',
      value: 'brightmint',
    },
    {
      name: 'lightblue',
      value: 'lightblue',
    },

    {
      name: 'blue',
      value: 'blue',
    },
    {
      name: 'point',
      value: 'point',
    },
    {
      name: 'purple',
      value: 'purple',
    },
    {
      name: 'yellow',
      value: 'yellow',
    },
    {
      name: 'orange',
      value: 'orange',
    },
    {
      name: 'peach',
      value: 'peach',
    },
    {
      name: 'pink',
      value: 'pink',
    },
    {
      name: 'red',
      value: 'red',
    },
    {
      name: 'white',
      value: 'white',
    },
    {
      name: 'greyccc',
      value: 'greyccc',
    },
  ];
  // #endregion

  // #region events
  /**
   * input 값 업데이트
   */
  const handleFormUpdate = (e: any, key: string, value?: any) => {
    setForm({ ...form, [key]: value ?? e.target.value });
  };

  /**
   * 금액 입력 값 업데이트
   */
  const handleInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // 숫자만 입력
    const onlyNumber = Number(target.value.replace(/[^\-\d]/g, '')) || 0;

    // 값 업데이트
    handleFormUpdate(e, 'amount', onlyNumber);
  };
  // #endregion

  // #region 등록
  /**
   * validation keys
   */
  const [validation, setValidation] = useState<Validation>({
    name: null,
  });

  /**
   * validation reset
   */
  const resetValidation = {
    name: null,
  };

  const groupValidate = () => {
    if (form.name === '') {
      setIsPass(false);
      return false;
    }

    setIsPass(true);
    return true;
  };

  /**
   * 유효성 검사
   */
  const checkValidate = () => {
    let isPass = true;
    const copyValidator = { ...resetValidation };

    if (form.name === '') {
      Object.assign(copyValidator, { ...copyValidator, name: false });
      isPass = false;
    }

    setValidation({ ...validation, ...copyValidator });

    return isPass;
  };

  /**
   * 로컬스토리지 저장
   */
  const saveLocalStorage = () => {
    let saveData = null;

    // 최초 저장
    if (!storageData) {
      saveData = [wallet];
    }
    // 수정모드
    else if (isEdit) {
      const prevJson: Wallet[] = JSON.parse(storageData);
      const index = prevJson.findIndex((v) => v.id === wallet.id);

      if (index !== -1) {
        prevJson.splice(index, 1, wallet);
        saveData = prevJson;
      }
    }
    // 기존 데이터 있을경우 추가
    else {
      const prevJson = JSON.parse(storageData);
      prevJson.push(wallet);
      saveData = prevJson;
    }

    // 로컬스토리지 저장 / 업데이트
    if (saveData)
      localStorage.setItem('propertyData', JSON.stringify(saveData));
  };

  /**
   * 이벤트 등록
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkValidate()) return;

    nextTick(() => {
      saveLocalStorage();

      setTimeout(() => {
        alert(`${isEdit ? '수정' : '등록'}이 완료되었습니다.`);
        router('/property');
      }, 100);
    });
  };

  const handleDelete = async () => {
    const wantToDelete = await confirm('정말로 삭제하시겠습니까?');
    if (!wantToDelete || !storageData) return;

    const query = new URLSearchParams(location.search);
    const uuid = query.get('id');
    const targetIndex = storageJSON.findIndex((v) => v.id === uuid);

    if (targetIndex !== -1) {
      storageJSON.splice(targetIndex, 1);
      localStorage.setItem('propertyData', JSON.stringify(storageJSON));

      nextTick(() => {
        alert('정상적으로 삭제되었습니다.');
        router('/property');
      });
    }
  };
  // #endregion

  // #region 세팅
  const initForm = () => {
    const query = new URLSearchParams(location.search);

    const isEditMode = query.get('mode') === 'edit';
    setIsEdit(isEditMode);

    // 수정일때
    if (isEditMode && storageData) {
      const uuid = query.get('id');
      const target = storageJSON.find((v) => v.id === uuid);

      if (target) {
        setForm({
          ...form,
          ...target,
          amount: Math.abs(target.amount),
        });
      }
    }
    // 저장일때
    else {
      const id = uuidv4();
      setForm({ ...form, id });
    }
  };

  const updatePreview = () => {
    // eslint-disable-next-line eqeqeq
    const multipleNumber = form.amount == 0 || form.positiveNumber ? 1 : -1;
    const amount = form.amount * multipleNumber;
    setWallet({ ...form, amount });
  };

  // form 값 변경 시 마다 submit 버튼 가능여부 체크
  useEffect(() => {
    setIsPass(groupValidate());
    updatePreview();
  }, [form]);

  // 최초 렌더링
  useEffect(() => {
    initForm();
  }, []);
  // #endregion

  return (
    <section className="add-property">
      <h2 className="blind">자산 추가하기</h2>

      <form className="add-property__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>장부 입력</legend>
          <div className="form__wrapper">
            {/* 자산이름 */}
            <dl className="form__field">
              <dt className="form__field__name">자산이름</dt>
              <dd className="form__field__cont">
                <input
                  type="text"
                  value={form.name}
                  placeholder="자산 이름"
                  maxLength={15}
                  spellCheck={false}
                  onInput={(e) => handleFormUpdate(e, 'name')}
                />

                {validation.name === false && (
                  <p className="form__error">자산 이름을 입력해주세요.</p>
                )}
              </dd>
            </dl>

            {/* 금액 */}
            <dl className="form__field form__amount">
              <dt className="form__field__name">자산금액</dt>
              <dd className="form__field__cont">
                <label className="form__amount__checkbox">
                  <input
                    type="checkbox"
                    name="positiveNumber"
                    checked={form.positiveNumber}
                    onChange={(e) =>
                      handleFormUpdate(e, 'positiveNumber', e.target.checked)
                    }
                  />
                  <span>-/+</span>
                </label>

                <label className="form__amount__input">
                  <input
                    type="tel"
                    value={Number(form.amount).toLocaleString('ko-kr')}
                    placeholder="0"
                    maxLength={18}
                    onInput={handleInputAmount}
                  />
                </label>
              </dd>
            </dl>

            {/* 컬러 */}
            <dl className="form__field form__color">
              <dt className="blind">컬러</dt>
              <dd className="form__field__cont">
                {colors &&
                  colors.length &&
                  colors.map((color, index) => {
                    return (
                      <label className="form__color__box" key={color.value}>
                        <input
                          type="radio"
                          name="color"
                          value={color.value}
                          onInput={(e) => handleFormUpdate(e, 'background')}
                          defaultChecked={index === 0}
                        />

                        <span className="form__color__name">
                          <em className={color.value}>{color.name}</em>
                        </span>
                      </label>
                    );
                  })}
              </dd>
            </dl>
          </div>

          <section className="add-property__preview">
            <h3 className="preview__title">미리보기</h3>

            <WalletComponent wallet={wallet} />
          </section>

          <nav className="form__nav">
            {/* 삭제하기 */}
            {isEdit && storageJSON.length > 1 && (
              <button
                type="button"
                className="form__delete"
                onClick={handleDelete}>
                삭제하기
              </button>
            )}

            {/* 등록/수정하기 */}
            <button
              type="submit"
              className={isPass ? 'form__submit active' : 'form__submit'}>
              {isEdit ? '수정하기' : '저장하기'}
            </button>
          </nav>
        </fieldset>
      </form>
    </section>
  );
}

export default AddProperty;
