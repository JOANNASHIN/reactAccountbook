import React from 'react';

interface Wallet {
  [key: string]: any;
  id: string;
  name: string;
  amount: number;
  background: string;
}

interface Props {
  wallet: Wallet;
}

export { Wallet };

function WalletComponent(props: Props) {
  const { wallet } = props;

  return (
    <div className={`wallet ${wallet.background}`}>
      <strong className="wallet__name">{wallet.name}</strong>
      <span className="wallet__amount">
        <em>{Number(wallet.amount).toLocaleString('ko-kr')}</em>원
      </span>
    </div>
  );
}

export default WalletComponent;
