import React, { useEffect, useState } from 'react';
import { getAmountSizeClass } from '../pages/Calendar';

/* eslint react/forbid-prop-types: 0 */
interface Balance {
  type: 'calendar' | 'property';
  income: number;
  spending: number;
  total: number;
}

interface Props {
  [key: string]: any;
}

export { Balance };

function SummaryComponent(props: Props) {
  const { balance } = props;
  const summary: Balance = {
    type: 'calendar',
    income: 0,
    spending: 0,
    total: 0,
  };

  const [title, setTitle] = useState({
    income: '수입',
    spending: '지출',
    balance: '총합',
  });

  useEffect(() => {
    if (summary.type === 'property') {
      setTitle({
        income: '자산',
        spending: '부채',
        balance: '총합',
      });
    }
  }, [summary.type]);

  Object.assign(summary, balance);

  return (
    <div className="summary">
      <dl className="summary__list">
        <dt className="summary__title">{title.income}</dt>
        <dd
          className={getAmountSizeClass(
            summary.income,
            `summary__amount income`,
          )}>
          <em>{summary.income.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">{title.spending}</dt>
        <dd
          className={getAmountSizeClass(
            summary.income,
            `summary__amount spending`,
          )}>
          <em>{summary.spending.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">{title.balance}</dt>
        <dd className={getAmountSizeClass(summary.income, `summary__amount`)}>
          <em>{summary.total.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
    </div>
  );
}

export default SummaryComponent;
