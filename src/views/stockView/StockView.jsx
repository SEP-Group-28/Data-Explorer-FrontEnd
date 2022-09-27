import React from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';
import CryptoIntervals from "../cryptoView/CryptoIntervals";

function StockView() {
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader />
          <CryptoIntervals />
        </div>
      </div>
    </div>
  );
}

export default StockView
