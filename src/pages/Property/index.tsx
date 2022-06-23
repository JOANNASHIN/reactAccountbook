import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import SummaryComponent, { Balance } from '../../components/Summary';
import WalletComponent, { Wallet } from '../../components/Wallet';

function Property() {
  const balance: Balance = {
    type: 'property',
    income: 0,
    spending: 0,
    total: 0,
  };

  const walletList: Wallet[] = [
    {
      id: 'cash',
      name: '현금',
      amount: 0,
      background: 'mint',
    },
    {
      id: 'card',
      name: '카드',
      amount: 50000,
      background: 'orange',
    },
    {
      id: 'bank',
      name: '은행',
      amount: 0,
      background: 'lightblue',
    },
    {
      id: 'saving',
      name: '저축',
      amount: 1000000,
      background: 'yellow',
    },
    {
      id: 'investment',
      name: '투자',
      amount: 1000000,
      background: '',
    },
  ];

  return (
    <section className="property">
      <header className="property__header">
        <h2 className="property__title">자산</h2>
        <Link to="/addAccount" className="ac__plus--default">
          자산 추가
        </Link>
      </header>

      {/* 요약 */}
      <SummaryComponent balance={balance} />

      {/* 카드 */}
      <ul className="property__wrapper">
        {walletList.map((wallet) => {
          return <WalletComponent wallet={wallet} key={wallet.id} />;
        })}
      </ul>
    </section>
  );
}

export default Property;
