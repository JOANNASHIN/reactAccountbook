import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { nextTick } from 'process';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';

interface Selectbox {
  [key: string]: any;
  name: string;
}

interface Validation {
  id: null | boolean;
  date: null | boolean;
  category: null | boolean;
  title: null | boolean;
  amount: null | boolean;
  method: null | boolean;
  type: null | boolean;
  memo: null | boolean;
}

interface Form {
  id: string;
  date: string;
  category: Selectbox;
  title: string;
  amount: string | number;
  method: Selectbox;
  type: string;
  memo: string;
}

export { Form };

function AddAccount() {
  // #region 기본 변수
  /**
   * router
   */
  const router = useNavigate();
  const location = useLocation();

  /** 수정모드 여부 */
  const [isEdit, setIsEdit] = useState(false);

  /** local storage 저장데이터 */
  const [storageData] = useState(localStorage.getItem('accountData'));

  /** validation pass 여부 */
  const [isPass, setIsPass] = useState(false);

  /**
   * form
   */
  const [form, setForm] = useState<Form>({
    id: '',
    date: '',
    category: {
      name: '카테고리 선택',
      value: '',
    },
    title: '',
    amount: '',
    method: {
      name: '결제수단',
      value: '',
    },
    type: 'spending',
    memo: '',
  });

  interface Test {
    [key: string]: IconName;
  }

  // const categoryIcons = {
  //   value: 'question',
  //   icon: '',
  // } as const;

  const [categoryIcon, useCategoryIcon] = useState<IconName>('question');
  useEffect(() => {
    useCategoryIcon(
      form.category.value === '' ? 'question' : form.category.value,
    );
  }, [form.category]);

  const categories = [
    {
      id: 0,
      name: '카테고리 선택',
      value: '',
    },

    {
      id: 1,
      name: '식비/아침',
      value: 'bread-slice',
    },

    {
      id: 2,
      name: '식비/점심',
      value: 'burger',
    },

    {
      id: 3,
      name: '식비/커피',
      value: 'mug-saucer',
    },

    {
      id: 4,
      name: '식비/간식',
      value: 'cookie-bite',
    },

    {
      id: 5,
      name: '식비/저녁',
      value: 'utensils',
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
    const onlyNumber = target.value.replace(/[^\d]/g, '');
    // 단위변환
    target.value = Number(onlyNumber.replace(/,/g, '')).toLocaleString('ko-kr');

    // 값 업데이트
    handleFormUpdate(e, 'amount', onlyNumber);
  };

  /**
   * 카테고리 선택 값 업데이트
   */
  const handleSelectUpdate = (
    e: React.FormEvent<HTMLSelectElement>,
    key: string,
  ) => {
    const { value, selectedIndex, options } = e.target as HTMLSelectElement;
    const name = options[selectedIndex].text;

    handleFormUpdate(e, key, {
      name,
      value,
    });
  };
  // #endregion

  // #region 등록
  /**
   * validation keys
   */
  const [validation, setValidation] = useState<Validation>({
    id: null,
    date: null,
    category: null,
    title: null,
    amount: null,
    method: null,
    type: null,
    memo: null,
  });

  /**
   * validation reset
   */
  const resetValidation = {
    id: null,
    date: null,
    category: null,
    title: null,
    amount: null,
    method: null,
    type: null,
    memo: null,
  };

  const groupValidate = () => {
    if (form.category.value === '') {
      setIsPass(false);
      return false;
    }
    if (form.title === '') {
      setIsPass(false);
      return false;
    }
    if (form.amount === '' || form.amount === 0) {
      setIsPass(false);
      return false;
    }
    if (form.method.value === '') {
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

    if (form.category.value === '') {
      Object.assign(copyValidator, { ...copyValidator, category: false });
      isPass = false;
    }

    if (form.title === '') {
      Object.assign(copyValidator, { ...copyValidator, title: false });
      isPass = false;
    }

    if (form.amount === '' || form.amount === 0) {
      Object.assign(copyValidator, { ...copyValidator, amount: false });
      isPass = false;
    }

    if (form.method.value === '') {
      Object.assign(copyValidator, { ...copyValidator, method: false });
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
      saveData = [form];
    }
    // 수정모드
    else if (isEdit) {
      const prevJson: Form[] = JSON.parse(storageData);
      const index = prevJson.findIndex((v) => v.id === form.id);

      if (index !== -1) {
        prevJson.splice(index, 1, form);
        saveData = prevJson;
      }
    }
    // 기존 데이터 있을경우 추가
    else {
      const prevJson = JSON.parse(storageData);
      prevJson.push(form);
      saveData = prevJson;
    }

    // 로컬스토리지 저장 / 업데이트
    if (saveData) localStorage.setItem('accountData', JSON.stringify(saveData));
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
        router('/');
      }, 100);
    });
  };

  const handleDelete = async () => {
    const wantToDelete = await confirm('정말로 삭제하시겠습니까?');
    if (!wantToDelete || !storageData) return;

    const query = new URLSearchParams(location.search);
    const savedJson: Form[] = JSON.parse(storageData);
    const uuid = query.get('id');
    const targetIndex = savedJson.findIndex((v) => v.id === uuid);

    if (targetIndex) {
      savedJson.splice(targetIndex, 1);
      localStorage.setItem('accountData', JSON.stringify(savedJson));

      nextTick(() => {
        alert('정상적으로 삭제되었습니다.');
        router('/');
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
      const savedJson: Form[] = JSON.parse(storageData);
      const uuid = query.get('id');
      const target = savedJson.find((v) => v.id === uuid);

      if (target) {
        setForm({
          ...form,
          ...target,
          amount: Number(target.amount).toLocaleString('ko-kr'),
        });
      }
    }
    // 저장일때
    else {
      const date = query.get('date') ?? dayjs().format('YYYY-MM-DD');
      const id = uuidv4();
      setForm({ ...form, date, id });
    }
  };

  // form 값 변경 시 마다 submit 버튼 가능여부 체크
  useEffect(() => {
    setIsPass(groupValidate());
  }, [form]);

  // 최초 렌더링
  useEffect(() => {
    initForm();
  }, []);
  // #endregion
  return (
    <section className="add-account">
      <h2 className="blind">장부 기록하기</h2>

      <form className="add-account__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>장부 입력</legend>

          <div className="form__wrapper">
            {/* 날짜 */}
            <div className="form__field">
              <label htmlFor="date" className="form__date form__label">
                <span className="form__date__icon">
                  <Icon icon={solid('calendar-check')} />
                </span>

                <input
                  type="date"
                  name="date"
                  defaultValue={form.date}
                  required
                  className="form__date__input"
                  onChange={(e) => handleFormUpdate(e, 'date')}
                />
              </label>
            </div>

            {/* 카테고리 */}
            <div className="form__field">
              <label className="form__category form__label">
                <span className="form__category__icon">
                  <Icon icon={categoryIcon} />
                </span>

                <select
                  className={form.category.value !== '' ? 'active' : ''}
                  value={form.category.value}
                  onChange={(e) => handleSelectUpdate(e, 'category')}>
                  {categories &&
                    categories.length &&
                    categories.map((category) => {
                      return (
                        <option value={category.value} key={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>

                <span className="form__place__text form__help-text">
                  (으)로
                </span>
              </label>

              {validation.category === false && (
                <p className="form__error">카테고리를 선택해주세요.</p>
              )}
            </div>

            {/* 사용처 */}
            <div className="form__field">
              <label className="form__use form__label">
                <input
                  type="text"
                  className="form__use__input"
                  defaultValue={form.title}
                  placeholder="어디"
                  maxLength={15}
                  spellCheck={false}
                  onInput={(e) => handleFormUpdate(e, 'title')}
                />
                <span className="form__use__text form__help-text">에서</span>
              </label>

              {validation.title === false && (
                <p className="form__error">
                  어디에서 사용하였는지 입력해주세요.
                </p>
              )}
            </div>

            {/* 금액 */}
            <div className="form__field">
              <label className="form__amount form__label">
                <input
                  type="tel"
                  defaultValue={form.amount}
                  placeholder="0"
                  className={form.type}
                  maxLength={18}
                  onInput={handleInputAmount}
                />
                <span className="form__help-text">원을</span>
              </label>

              {validation.amount === false && (
                <p className="form__error">금액을 입력해주세요.</p>
              )}
            </div>

            {/* 결제수단 */}
            <div className="form__field">
              <label className="form__method form__label">
                <select
                  className={form.method.value !== '' ? 'active' : ''}
                  value={form.method.value}
                  onChange={(e) => handleSelectUpdate(e, 'method')}>
                  <option value="">결제수단</option>
                  <option value="1">현금</option>
                  <option value="2">삼성카드</option>
                  <option value="3">신한카드</option>
                </select>
                <span className="form__help-text">(으)로</span>
              </label>

              {validation.method === false && (
                <p className="form__error">결제수단을 선택해주세요.</p>
              )}
            </div>

            {/* 유형 */}
            <div className="form__type form__field">
              <label>
                <input
                  type="radio"
                  name="type"
                  defaultValue="spending"
                  defaultChecked
                  onInput={(e) => handleFormUpdate(e, 'type')}
                />
                <span className="form__type__name form__type__name--spending">
                  지출
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  defaultValue="income"
                  onInput={(e) => handleFormUpdate(e, 'type')}
                />
                <span className="form__type__name form__type__name--income">
                  수입
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  defaultValue="send"
                  onInput={(e) => handleFormUpdate(e, 'type')}
                />
                <span className="form__type__name form__type__name--send">
                  이체
                </span>
              </label>

              <span className="form__help-text">했어요</span>
            </div>
          </div>

          {/* 메모 */}
          <label className="form__memo form__field">
            <textarea
              defaultValue={form.memo}
              onChange={(e) => handleFormUpdate(e, 'memo')}
              placeholder="메모를 입력해주세요."
            />
          </label>

          <nav className="form__nav">
            {/* 등록/수정하기 */}
            <button
              type="submit"
              className={isPass ? 'form__submit active' : 'form__submit'}>
              {isEdit ? '수정하기' : '저장하기'}
            </button>

            {/* 삭제하기 */}
            {isEdit && (
              <button
                type="button"
                className="form__delete"
                onClick={handleDelete}>
                삭제하기
              </button>
            )}
          </nav>
        </fieldset>
      </form>
    </section>
  );
}

export default AddAccount;
