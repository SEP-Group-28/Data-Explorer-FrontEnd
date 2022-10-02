import React,{useState} from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';
import CryptoIntervals from "../cryptoView/CryptoIntervals";
import StockChart from './StockChart';
import StockTypes from './StockTypes';
import { useLocation } from 'react-router-dom';

function StockView() {
  const location=useLocation()
  try{
    var defaultMarket = location.state.market;
  }catch (error){
    defaultMarket = "tsla";
  }
  
  const [market, setMarket] = useState(defaultMarket);
  const changeStockType = (marketType) => {
    setMarket(marketType);
  };

  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader />
          <CryptoIntervals />
          <StockChart market={market} />
        </div>
        <div className="types-crypto">
          <StockTypes changeStockType={changeStockType} />
        </div>
      </div>
    </div>
  );
}

export default StockView
