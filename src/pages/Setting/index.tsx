import { nextTick } from 'process';
import React from 'react';
import { Link } from 'react-router-dom';

function Setting() {
  const handleDeleteAll = async () => {
    const wantToDelete = await confirm('전체 데이터를 삭제하시겠습니까?');
    if (!wantToDelete) return;

    localStorage.removeItem('accountData');

    nextTick(() => {
      setTimeout(() => {
        alert('모든 데이터가 리셋되었습니다.');
      }, 100);
    });
  };

  return (
    <section className="setting ac__page-layout">
      <header className="ac__page-layout__header">
        <h2 className="ac__page-layout__title">설정</h2>
      </header>

      <div className="setting__cont">
        <button
          type="button"
          onClick={handleDeleteAll}
          className="setting__reset">
          전체 데이터 리셋하기
        </button>

        <button
          type="button"
          onClick={handleDeleteAll}
          className="setting__reset">
          전체 데이터 리셋하기
        </button>

        <button
          type="button"
          onClick={handleDeleteAll}
          className="setting__reset">
          전체 데이터 리셋하기
        </button>

        <ul className="setting__wrapper">
          <li className="setting__menu">
            <Link to="/" className="setting__menu__link">
              메뉴
            </Link>
          </li>
          <li className="setting__menu">메뉴</li>
          <li className="setting__menu">메뉴</li>
        </ul>
      </div>
    </section>
  );
}

export default Setting;
