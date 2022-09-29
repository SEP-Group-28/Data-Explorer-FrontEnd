import React from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';



function CryptoView() {
  const location=useLocation()
  const market="BTC"
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader />
          <CryptoIntervals />
          <CryptoChart market={market}/>
        </div>
        <div className="types-crypto">
          <CryptoTypes />
        </div>
      </div>
    </div>
  );
}

export default CryptoView
