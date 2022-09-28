import React from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import CryptoChart from './CryptoChart';

function CryptoView() {
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader />
          <CryptoIntervals />
        </div>
        <div className="types-crypto">
          <CryptoTypes />
          <CryptoChart />
        </div>
      </div>
    </div>
  );
}

export default CryptoView
