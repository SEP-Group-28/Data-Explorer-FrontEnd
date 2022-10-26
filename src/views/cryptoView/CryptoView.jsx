import React, { useState, useEffect } from "react";
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';


function CryptoView() {
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const [internalIndicators, setInternalIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });

  // useEffect(() => {
  //   console.log(market)
  //   setInternalIndicators({
  //     ma: false,
  //     sma: false,
  //     ema: false,
  //     wma: false,
  //     bbands: false,
  //   });
  // }, [market]);
  const changeCryptoType = (marketType) => {
    setMarket(marketType);
  };
  const changeInterval = (interval) => {
    setInterval(interval);
  };
  const addInternalIndicators = (indicators) => {
    setInternalIndicators(indicators);
  };
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader market={market} interval={interval} />
          <CryptoIntervals
            changeInterval={changeInterval}
            timeInterval={interval}
            addInternalIndicators={addInternalIndicators}
          />
          <CryptoChart
            market={market}
            interval={interval}
            internalIndicators={internalIndicators}
          />
        </div>
        <div className="types-crypto">
          <CryptoTypes changeCryptoType={changeCryptoType} />
        </div>
      </div>
    </div>
  );
}

export default CryptoView
