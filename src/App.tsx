import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './layouts/Header';
import Dockbar from './layouts/Dockbar';
import Routes from './routes';

function App() {
  // #region location update
  const [currentPath, setCurrentPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  // #endregion

  // #region rem
  const settingRem = () => {
    const htmlDoc = document.documentElement;
    let enSizing = false;
    function setFontSize() {
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
  // #endregion

  return (
    <div className="account__layout">
      <Header />
      <Routes />
      <Dockbar currentPath={currentPath} />
    </div>
  );
}

export default App;
