import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

type Props = {
  [key: string]: any;
  title: ReactNode;
  children: ReactNode;
};

function Modal(props: Props) {
  const { onClose, title, children } = props;

  return (
    <article className="modal modal--show">
      {/* 모달 dim */}
      <div className="modal__mask">딤영역</div>

      {/* 모달 레이어 */}
      <main className="modal__layer modalScroll">
        {/* 모달 상단 */}
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose}>
            <Icon icon={solid('close')} />
          </button>
        </header>

        {/* 모달 콘텐츠 */}
        <div className="modal__body">{children}</div>
      </main>
    </article>
  );
}

export default Modal;
