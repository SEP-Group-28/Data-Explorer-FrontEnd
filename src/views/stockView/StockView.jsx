import React,{useState} from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';

import StockIntervals from './StockIntervals';
import StockChart from './StockChart';
import StockTypes from './StockTypes';

function StockView() {

  const [market, setMarket] = useState("");
  const [interval,setInterval] = useState("")
  const changeStockType = (marketType) => {
    setMarket(marketType);
  };
  const changeInterval = (interval)=>{
    setInterval(interval)
  }

  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader market={market} interval={interval} />
          <StockIntervals changeInterval={changeInterval} />
          <StockChart market={market} interval={interval} />
        </div>
        <div className="types-crypto">
          <StockTypes changeStockType={changeStockType} />
        </div>
      </div>
    </div>
  );
}

export default StockView
