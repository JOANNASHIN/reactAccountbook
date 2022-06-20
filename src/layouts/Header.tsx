import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Header() {
  return (
    <header className="ac__header">
      <h1 className="ac__logo">
        <Icon icon={solid('wallet')} />
        <span>가계부</span>
      </h1>
    </header>
  );
}

export default Header;
