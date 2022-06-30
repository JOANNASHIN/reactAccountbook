import { createBrowserHistory } from 'history';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryState {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
  to: string;
  from: string;
  state: HistoryState;
  className: string;
  children: ReactNode;
}
function CustomLink(props: Props) {
  const { to, from, state, className, children } = props;
  const router = useNavigate();
  const history = createBrowserHistory();

  const saveHistory = () => {
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
