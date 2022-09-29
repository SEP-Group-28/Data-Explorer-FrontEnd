import React from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';
import CryptoIntervals from "../cryptoView/CryptoIntervals";
import StockChart from './StockChart';
import { useLocation } from 'react-router-dom';

function StockView() {
  const location=useLocation()
  const market=location.state.market
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader />
          <CryptoIntervals />
          <StockChart market={market}/>
        </div>
      </div>
    </div>
  );
}

export default StockView
