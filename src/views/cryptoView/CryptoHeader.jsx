import React from 'react'
import { useLocation } from "react-router-dom";

function CryptoHeader({ market, interval }) {
  const handleClick = () => {
    console.log("hey");
  };

  const location = useLocation();

  const marketState = "BTC/USDT";
  var intervalState = location?.state?.interval || "1m";
  return (
    <div className="CryptoHeader crypto-bar stock-header">
      <header className="stock-header">
        {market || marketState} - <span>{interval || intervalState}</span>
      </header>
      <div className="d-flex flex-row justify-content-evenly">
        <p>Volume </p>
        <p>Total high </p>
        <p>Total low</p>
      </div>
      <button type="button" onClick={handleClick} className="watchlist-btn">
        Add to watchlist
      </button>
    </div>
  );
}

export default CryptoHeader
