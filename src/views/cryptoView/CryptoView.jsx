import React, { useState, useEffect } from "react";
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Badge from '@mui/material/Badge';
import Alert from '../alert/Alert';
import LineChart from "../../components/technicalIndicators/lineChart";
import MACDChart from "../../components/technicalIndicators/macdChart";
import StochChart from "../../components/technicalIndicators/stochChart";
import PageLoader from "../../components/pageLoader/PageLoader";

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

  const [externalIndicators, setExternlIndicators] = useState({
    macd: false,
    obv: false,
    roc: false,
    rsi: false,
    stoch: false,
})

  const changeCryptoType = (marketType) => {
    setMarket(marketType);
  };
  const changeInterval = (interval) => {
    setInterval(interval);
  };
    const addInternalIndicators = (indicators) => {
      setInternalIndicators(indicators);
    };
    const addExternalIndicators = (indicators) => {
      setExternlIndicators(indicators);
    };

  // getting user
  // try {
  //   var user = jwtDecode(Token.getAccessToken());
  // } catch (err) {
  //   user = null;
  // }
  
  // user = true
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const { macd, obv, roc, rsi, stoch } = externalIndicators;
  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader market={market} interval={interval} />
          <CryptoIntervals
            changeInterval={changeInterval}
            addInternalIndicators={addInternalIndicators}
            addExternalIndicators={addExternalIndicators}
          />
          <CryptoChart
            market={market}
            interval={interval}
            internalIndicators={internalIndicators}
          />
          {rsi && <LineChart marketType="crypto" market={market} interval={interval} type="rsi" />}
          {obv && <LineChart marketType="crypto" market={market} interval={interval} type="obv" />}
          {roc && <LineChart marketType="crypto" market={market} interval={interval} type="roc" />}
          {macd && <MACDChart marketType="crypto" market={market} interval={interval} />}
          {stoch && <StochChart marketType="crypto" market={market} interval={interval}/>}
        </div>
        <div className="types-crypto">
          <CryptoTypes changeCryptoType={changeCryptoType} />
        </div>
        {/* alert button */}
        {/* TODO: 
        fix css of the alert button */}
      </div>
    </div>
      )}
    </div>
  );
}

export default CryptoView
