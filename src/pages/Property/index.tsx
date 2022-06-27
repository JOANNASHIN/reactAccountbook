import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import SummaryComponent, { Balance } from '../../components/Summary';
import WalletComponent, { Wallet } from '../../components/Wallet';

function Property() {
  const [walletList, setWalletList] = useState<Wallet[]>();

  useEffect(() => {
    const savedData = localStorage.getItem('propertyData');
    if (savedData) setWalletList(JSON.parse(savedData));
  }, []);

  // #region summary
  /** 잔고 summary */
  const [balance, setBalance] = useState<Balance>({
    type: 'property',
    income: 0,
    spending: 0,
    total: 0,
  });

  /** summary 데이터 세팅 */
  useEffect(() => {
    const total: Balance = {
      type: 'property',
      income: 0,
      spending: 0,
      total: 0,
    };

    if (walletList) {
      walletList.forEach((v) => {
        if (v.amount < 0) {
          total.spending -= +v.amount;
        } else if (v.amount) {
          total.income += +v.amount;
        }

        total.total += +v.amount;
      });
    }

    setBalance(total);
  }, [walletList]);
  // #endregion

  return (
    <section className="property">
      <header className="property__header">
        <h2 className="property__title">자산</h2>
        <Link to="/addProperty" className="ac__plus--default">
          자산 추가
        </Link>
      </header>

      {/* 요약 */}
      <SummaryComponent balance={balance} />

      {/* 카드 */}
      <div className="property__wrapper">
        {walletList && walletList.length ? (
          walletList.map((wallet) => {
            return (
              <Link
                to={`/addProperty?mode=edit&id=${wallet.id}`}
                key={wallet.id}
                className="property__box">
                <WalletComponent wallet={wallet} />
              </Link>
            );
          })
        ) : (
          <div className="property__empty">
            <Link to="/addProperty" className="property__empty__add">
              자산 추가하기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Property;
