import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

function Header(props: Props) {
  const { title } = props;
  const history = useNavigate();

  return (
    <header className="ac__header">
      <button type="button" className="ac__back" onClick={() => history(-1)}>
        <Icon icon={solid('angle-left')} />
        <span>뒤로가기</span>
      </button>

      <h1 className="ac__title">{title ?? '가계부'}</h1>
    </header>
  );
}

export default Header;
