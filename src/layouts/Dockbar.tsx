import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Router from '../routes';

export default function Dockbar() {
  return (
    <nav className="account__dockbar">
      {/* <BrowserRouter>
        <Link to="/" className="account__dockbar__menu">
          <Icon icon={solid('calendar-day')} />
        </Link>

        <Link to="/property" className="account__dockbar__menu">
          <Icon icon={solid('wallet')} />
        </Link>
      </BrowserRouter> */}
      <a href="/" className="account__dockbar__menu">
        <Icon icon={solid('calendar-day')} />
      </a>

      <a href="/property" className="account__dockbar__menu">
        <Icon icon={solid('wallet')} />
      </a>
    </nav>
  );
}
