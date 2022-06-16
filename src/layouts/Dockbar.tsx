import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';

interface Props {
  currentPath: string;
}
function Dockbar(props: Props) {
  const { currentPath } = props;

  const dockbarMenus = [
    {
      id: '000',
      title: '홈',
      path: '/',
      icon: solid('calendar-day'),
    },
    {
      id: '001',
      title: '자산',
      path: '/property',
      icon: solid('wallet'),
    },
  ];

  return (
    <nav className="account__dockbar">
      {dockbarMenus.map((menu) => {
        return (
          <Link
            to={menu.path}
            className={
              currentPath === menu.path
                ? 'account__dockbar__menu active'
                : 'account__dockbar__menu'
            }
            key={menu.id}>
            <Icon icon={menu.icon} />
            <span className="blind">{menu.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Dockbar;
