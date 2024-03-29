import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Dockbar from './components/Dockbar';
import Routes from './routes';

interface PageInfo {
  id: string;
  title: string;
}

function App() {
  // #region location update
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState({
    id: 'calendar',
    path: '/',
    title: '달력',
  });

  /** 현재 페이지 정보 얻어오기 */
  // @TODO: 라우터에서 받아오는 방법찾기 또는 한번에 처리..
  const getCurrentInfo = (path: string): PageInfo => {
    if (path === '/') return { id: 'calendar', title: '달력' };
    if (path === '/property') return { id: 'property', title: '자산' };
    if (path === '/addAccount') return { id: 'addAccount', title: '내역 추가' };
    if (path === '/addProperty')
      return { id: 'addProperty', title: '자산 추가' };
    return { id: 'calendar', title: '달력' };
  };

  /** 페이지 이동시 세팅 */
  useEffect(() => {
    setCurrentPage({
      id: getCurrentInfo(location.pathname).id,
      path: location.pathname,
      title: getCurrentInfo(location.pathname).title,
    });
  }, [location.pathname]);
  // #endregion

  // #region rem 세팅
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

  const [isShowHeader, setIsShowHeader] = useState(false);
  const [isShowDockbar, setIsShowDockbar] = useState(false);

  const getShowable = () => {
    if (currentPage.id === 'addAccount' || currentPage.id === 'addProperty') {
      setIsShowHeader(true);
      setIsShowDockbar(false);
    } else {
      setIsShowHeader(false);
      setIsShowDockbar(true);
    }
  };

  useEffect(() => {
    getShowable();
  }, [currentPage]);

  useEffect(() => {
    settingRem();
  }, []);
  // #endregion

  return (
    <div id={currentPage.id} className="ac__layout">
      {isShowHeader && <Header title={currentPage.title} />}
      <Routes />
      {isShowDockbar && <Dockbar currentPath={currentPage.path} />}
    </div>
  );
}

export default App;
