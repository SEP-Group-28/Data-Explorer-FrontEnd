import React,{useState} from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';
import StockIntervals from './StockIntervals';
import StockChart from './StockChart';
import StockTypes from './StockTypes';

function StockView() {

  const [market, setMarket] = useState("");
  const [interval,setInterval] = useState("")
  const [internalIndicators, setInternalIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });

  const changeStockType = (marketType) => {
    setMarket(marketType);
  };
  const changeInterval = (interval)=>{
    setInterval(interval)
  }
  const addInternalIndicators = (indicators) => {
    setInternalIndicators(indicators);
  };

  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader market={market} interval={interval} />
          <StockIntervals changeInterval={changeInterval} addInternalIndicators={addInternalIndicators}/>
          <StockChart market={market} interval={interval} internalIndicators={internalIndicators}/>
        </div>
        <div className="types-crypto">
          <StockTypes changeStockType={changeStockType} />
        </div>
      </div>
    </div>
  );
}

export default StockView
