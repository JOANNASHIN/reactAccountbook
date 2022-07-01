import { createBrowserHistory } from 'history';
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HistoryState {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
  to: string;
  state: HistoryState;
  className: string;
  children: ReactNode;
}

function CustomLink(props: Props) {
  const { to, state, className, children } = props;

  const router = useNavigate();
  const location = useLocation();
  const history = createBrowserHistory();

  const saveHistory = () => {
    const from = location.pathname;

    history.push(from, state);
    router(to);
  };

  return (
    <button type="button" className={className} onClick={saveHistory}>
      {children}
    </button>
  );
}

export default CustomLink;
