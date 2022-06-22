import React from 'react';

/* eslint react/forbid-prop-types: 0 */
interface Balance {
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
    income: 0,
    spending: 0,
    total: 0,
  };

  Object.assign(summary, balance);

  return (
    <div className="summary">
      <dl className="summary__list">
        <dt className="summary__title">수입</dt>
        <dd className="summary__amount income">
          <em>{summary.income.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">지출</dt>
        <dd className="summary__amount spending">
          <em>{summary.spending.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">총합</dt>
        <dd className="summary__amount">
          <em>{summary.total.toLocaleString('ko-kr')}</em>
          <span>원</span>
        </dd>
      </dl>
    </div>
  );
}

export default SummaryComponent;
