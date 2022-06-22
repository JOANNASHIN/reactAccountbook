import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

type Props = {
  [key: string]: any;
  title: ReactNode;
  children: ReactNode;
};

function ModalComponent(props: Props) {
  const { onClose, title, children } = props;

  return (
    <article className="modal modal--show">
      {/* 모달 dim */}
      <button type="button" className="modal__mask" onClick={onClose}>
        딤영역
      </button>

      {/* 모달 레이어 */}
      <main className="modal__layer modalScroll">
        {/* 모달 상단 */}
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
        </header>

        {/* 모달 콘텐츠 */}
        <div className="modal__body">{children}</div>
        <button type="button" className="modal__close" onClick={onClose}>
          <Icon icon={solid('close')} />
        </button>
      </main>
    </article>
  );
}

export default ModalComponent;
