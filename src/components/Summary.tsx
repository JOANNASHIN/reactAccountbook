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
export default function SummaryComponent(props: Props) {
  const { balance } = props;
  const summary: Balance = {
    income: 0,
    spending: 0,
    total: 0,
  };

  Object.assign(summary, balance);

  return (
    <div className="ac__calendar__summary">
      <dl className="summary__list">
        <dt className="summary__title">수입</dt>
        <dd className="summary__amount summary__amount--income">
          {summary.income.toLocaleString('ko-kr')}
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">지출</dt>
        <dd className="summary__amount summary__amount--spending">
          {summary.spending.toLocaleString('ko-kr')}
        </dd>
      </dl>
      <dl className="summary__list">
        <dt className="summary__title">총합</dt>
        <dd className="summary__amount summary__amount--balance">
          {summary.total.toLocaleString('ko-kr')}
        </dd>
      </dl>
    </div>
  );
}
