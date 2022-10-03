import React, { useState } from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';



function CryptoView() {
  // const location = useLocation();
  // try {
  //   var defaultMarket = location.state.market;
  // } catch (error) {
  //   defaultMarket = "BTC";
  // }
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const changeCryptoType=(marketType)=>{
    setMarket(marketType);
  }
  const changeInterval = (interval) => {
    setInterval(interval);
  };
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader market={market} interval={interval} />
          <CryptoIntervals changeInterval={changeInterval} />
          <CryptoChart market={market} interval={interval} />
        </div>
        <div className="types-crypto">
          <CryptoTypes changeCryptoType={changeCryptoType} />
        </div>
      </div>
    </div>
  );
}

export default CryptoView
