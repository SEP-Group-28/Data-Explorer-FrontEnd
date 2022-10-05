import React from 'react'
import IndicatorMenuOne from '../../components/indicators/IndicatorMenuOne';
import IndicatorMenuTwo from '../../components/indicators/IndicatorMenuTwo';
import { useLocation } from "react-router-dom";

function CryptoIntervals({ changeInterval,timeInterval }) {
  const intervals = ["1m", "5m", "30m", "1h", "1d"];
  var intervalState = location?.state?.interval || "1m";

  const handleClick = (interval) => {
    changeInterval(interval);
  };
  return (
    <div className="CryptoIntervals crypto-bar">
      <div className="d-flex flex-row justify-content-evenly align-items-center">
        <IndicatorMenuOne />
        <IndicatorMenuTwo />
      </div>
      <div className="d-flex flex-row justify content-center">
        <header>Time interval</header>
        <div className="interval-btns">
          {intervals.map((interval) => {
            return (
              <button
                type="button"
                className={" interval-btn "+ interval == (timeInterval || intervalState)? " active-interval":""}
                onClick={()=>{handleClick(interval)}}
                key={interval}
              >
                {interval}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CryptoIntervals
