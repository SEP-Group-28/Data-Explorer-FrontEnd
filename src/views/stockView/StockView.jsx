import React,{useState} from 'react'
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from './StockHeader';
import StockIntervals from './StockIntervals';
import StockChart from './StockChart';
import StockTypes from './StockTypes';
import LineChart from "../../components/technicalIndicators/lineChart";
import MACDChart from "../../components/technicalIndicators/macdChart";
import StochChart from "../../components/technicalIndicators/stochChart";
import { useDispatch, useSelector } from "react-redux";
import { updateStockChartData, updateStockDataLimit, updateStockTimeStamp } from "../../redux/chart";

function StockView() {
  const dispatch = useDispatch();
  const [market, setMarket] = useState("");
  const [interval,setInterval] = useState("")
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
  });

  const changeStockType = (marketType) => {
    setMarket(marketType);
    dispatch(
      updateStockChartData({
        stockChartData: [],
        stockVolumeData: [],
      })
    );
    dispatch(updateStockDataLimit(280));
    dispatch(updateStockTimeStamp(0));
  };
  const changeInterval = (interval)=>{
    setInterval(interval)
   dispatch(
     updateStockChartData({
       stockChartData: [],
       stockVolumeData: [],
     })
   );
   dispatch(updateStockDataLimit(280));
   dispatch(updateStockTimeStamp(0));
  }
  const addInternalIndicators = (indicators) => {
    setInternalIndicators(indicators);
  };
  const addExternalIndicators = (indicators) => {
    setExternlIndicators(indicators);
  };

  const { macd, obv, roc, rsi, stoch } = externalIndicators;

  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <StockHeader market={market} interval={interval} />
          <StockIntervals changeInterval={changeInterval} addInternalIndicators={addInternalIndicators} addExternalIndicators={addExternalIndicators}/>
          <StockChart market={market} interval={interval} internalIndicators={internalIndicators} />

          {rsi && <LineChart marketType="stock" market={market} interval={interval} type="rsi" />}
          {obv && <LineChart marketType="stock" market={market} interval={interval} type="obv" />}
          {roc && <LineChart marketType="stock" market={market} interval={interval} type="roc" />}
          {macd && <MACDChart marketType="stock" market={market} interval={interval} />}
          {stoch && <StochChart marketType="stock" market={market} interval={interval}/>}

        </div>
        <div className="types-crypto">
          <StockTypes changeStockType={changeStockType} />
        </div>
      </div>
    </div>
  );
}

export default StockView
