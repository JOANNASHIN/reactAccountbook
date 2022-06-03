/* eslint-disable no-undef */
import React, { useEffect } from 'react';

import Header from './layouts/Header';
import Router from './routes/index';
import Dockbar from './layouts/Dockbar';

function App() {
  const settingRem = () => {
    const htmlDoc = document.documentElement;
    let enSizing = false;
    function setFontSize() {
      // if (window.innerWidth > window.innerHeight) return;

      const remBaseFont = (htmlDoc.offsetWidth / 360) * 62.5; // 10px 기준
      htmlDoc.style.fontSize = `${remBaseFont > 62.5 ? remBaseFont : 62.5}%`;
    }

    window.onresize = () => {
      if (!enSizing) {
        window.requestAnimationFrame(() => {
          setFontSize();
          enSizing = false;
        });
      }
      enSizing = true;
    };

    window.dispatchEvent(new Event('resize'));
  };

  useEffect(() => {
    settingRem();
  });

  return (
    <div className="account__layout">
      <Header />
      <Router />
      <Dockbar />
    </div>
  );
}

export default App;
