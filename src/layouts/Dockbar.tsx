import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Dockbar() {
  return (
    <nav className="account__dockbar">
      <a href="/" className="account__dockbar__menu active">
        <FontAwesomeIcon icon={solid('calendar-day')} />
      </a>
      <a href="/property" className="account__dockbar__menu">
        <FontAwesomeIcon icon={solid('wallet')} />
      </a>
    </nav>
  );
}
