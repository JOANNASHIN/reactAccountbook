import React from 'react';
import SummaryComponent, { Balance } from '../../components/Summary';

function Property() {
  const balance: Balance = {
    income: 0,
    spending: 0,
    total: 0,
  };

  return (
    <section className="ac__calendar">
      <h2 className="blind">자산</h2>

      <SummaryComponent balance={balance} />
    </section>
  );
}

export default Property;
