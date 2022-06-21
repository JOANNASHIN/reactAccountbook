import React from 'react';
import SummaryComponent, { Balance } from '../../components/Summary';

function Property() {
  const balance: Balance = {
    income: 0,
    spending: 0,
    total: 0,
  };

  return (
    <section className="property">
      <h2 className="property__title">자산</h2>
      <SummaryComponent balance={balance} />

      <ul className="property__wrapper">
        <li className="property__wallet cash">
          <strong className="property__wallet__name">현금</strong>
          <span className="property__wallet__amount">
            <em>2,712,565</em>원
          </span>
        </li>

        <li className="property__wallet point card">
          <strong className="property__wallet__name">카드</strong>
          <span className="property__wallet__amount">
            <em>2,712,565</em>원
          </span>
        </li>

        <li className="property__wallet bank">
          <strong className="property__wallet__name">은행</strong>
          <span className="property__wallet__amount">
            <em>2,712,565</em>원
          </span>
        </li>

        <li className="property__wallet saving">
          <strong className="property__wallet__name">저축</strong>
          <span className="property__wallet__amount">
            <em>2,712,565</em>원
          </span>
        </li>

        <li className="property__wallet investment">
          <strong className="property__wallet__name">투자</strong>
          <span className="property__wallet__amount">
            <em>2,712,565</em>원
          </span>
        </li>
      </ul>
    </section>
  );
}

export default Property;
