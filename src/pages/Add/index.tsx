import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import SummaryComponent, { Balance } from '../../components/Summary';
import WalletComponent, { Wallet } from '../../components/Wallet';

function Add() {
  return (
    <section className="add">
      <header className="add__header">
        {/* <button type="button" className="ac__plus--default">
          자산 추가 버튼
        </button> */}
        <h2 className="add__title">등록</h2>
      </header>
    </section>
  );
}

export default Add;
