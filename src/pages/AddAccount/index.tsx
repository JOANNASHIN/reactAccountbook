import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { nextTick } from 'process';
import { useNavigate } from 'react-router-dom';

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
  category: string;
  title: string;
  amount: string;
  method: string;
  type: string;
  memo: string;
}

function AddAccount() {
  const history = useNavigate();

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

  const [form, setForm] = useState<Form>({
    id: '',
    date: '',
    category: '',
    title: '',
    amount: '',
    method: '',
    type: 'spending',
    memo: '',
  });

  useEffect(() => {
    const date = dayjs().format('YYYY-MM-DD');
    const id = uuidv4();
    setForm({ ...form, date, id });
  }, []);

  const handleInputUpdate = (e: any, key: string) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleInputAmount = (e: any) => {
    // 숫자만 입력
    const onlyNumber = e.target.value.replace(/[^\d]/g, '');
    // 단위변환
    e.target.value = Number(onlyNumber.replace(/,/g, '')).toLocaleString(
      'ko-kr',
    );

    // 값 업데이트
    handleInputUpdate(e, 'amount');
  };

  /** 유효성 검사 */
  const checkValidate = () => {
    let isPass = true;
    const copyValidator = { ...resetValidation };

    if (form.category === '') {
      Object.assign(copyValidator, { ...copyValidator, category: false });
      isPass = false;
    }

    if (form.title === '') {
      Object.assign(copyValidator, { ...copyValidator, title: false });
      isPass = false;
    }

    if (form.amount === '') {
      Object.assign(copyValidator, { ...copyValidator, amount: false });
      isPass = false;
    }

    if (form.method === '') {
      Object.assign(copyValidator, { ...copyValidator, method: false });
      isPass = false;
    }

    setValidation({ ...validation, ...copyValidator });

    return isPass;
  };

  /** 저장 */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!checkValidate()) return;

    nextTick(() => {
      localStorage.setItem('data', JSON.stringify(form));

      setTimeout(() => {
        alert('등록이 완료되었습니다.');
        history('/');
      }, 100);
    });
  };

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
                />
              </label>
            </div>

            {/* 카테고리 */}
            <div className="form__field">
              <label className="form__category form__label">
                <span className="form__category__icon">
                  <Icon icon={solid('burger')} />
                </span>

                <select
                  defaultValue={form.category}
                  onChange={(e) => handleInputUpdate(e, 'category')}>
                  <option value="">카테고리 선택</option>
                  <option value="0">식비/아침</option>
                  <option value="1">식비/점심</option>
                  <option value="2">식비/커피</option>
                  <option value="3">식비/저녁</option>
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
                  onInput={(e) => handleInputUpdate(e, 'title')}
                />
                <span className="form__use__text form__help-text">에서</span>
              </label>

              {validation.title === false && (
                <p className="form__error">사용처를 입력해주세요.</p>
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
                  defaultValue={form.method}
                  onChange={(e) => handleInputUpdate(e, 'method')}>
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
                  onInput={(e) => handleInputUpdate(e, 'type')}
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
                  onInput={(e) => handleInputUpdate(e, 'type')}
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
                  onInput={(e) => handleInputUpdate(e, 'type')}
                />
                <span className="form__type__name form__type__name--send">
                  이체
                </span>
              </label>

              <span className="form__help-text">했어요</span>
            </div>
          </div>

          <label className="form__memo form__field">
            <textarea
              defaultValue={form.memo}
              onChange={(e) => handleInputUpdate(e, 'memo')}
              placeholder="메모를 입력해주세요."
            />
          </label>

          <nav className="form__nav">
            <button type="submit" className="form__submit active">
              저장하기
            </button>
          </nav>
        </fieldset>
      </form>
    </section>
  );
}

export default AddAccount;
