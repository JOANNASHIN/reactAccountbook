import React from 'react';
import '../styles/pages/calendar.scss';

export default function index() {
  return (
    <section className="fb__calendar">
      <h2 className="blind">캘린더</h2>

      <header className="fb__calendar__summary">
        <dl className="summary__list">
          <dt className="summary__title">수입</dt>
          <dd className="summary__amount">0</dd>
        </dl>
        <dl className="summary__list">
          <dt className="summary__title">지출</dt>
          <dd className="summary__amount">0</dd>
        </dl>
        <dl className="summary__list">
          <dt className="summary__title">총합</dt>
          <dd className="summary__amount">0</dd>
        </dl>
      </header>
    </section>
  );
}
