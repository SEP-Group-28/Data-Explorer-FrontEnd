import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import config from "../../config.json"

function CryptoHeader({ market, interval }) {
  const [volume,setVolume] = useState(0)
  const handleClick = () => {
    console.log("hey");
  };
  const location = useLocation();
  const marketState = "BTC";
  var intervalState = location?.state?.interval || "1m";

useEffect(()=>{
  let eventSource = new EventSource(
    `${config.DOMAIN_NAME}/present/` +
      `${market || marketState}/1d`)

      eventSource.addEventListener(
        "message",
        function(e){
          let parsedData = JSON.parse(e.data);
          setVolume(parsedData[5]);
        },
      )
  
},[market])
  
  return (
    <div className="CryptoHeader crypto-bar stock-header">
      <header className="stock-header">
        {market || marketState}/USDT - <span>{interval || intervalState}</span>
      </header>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="d-flex flex-column">
        <p>24hVolume</p>
        <span className="volume-value">{volume.toFixed(5)}</span>
      </div>
      </div>
      <button type="button" onClick={handleClick} className="watchlist-btn">
        Add to watchlist
      </button>
    </div>
  );
}

export default CryptoHeader
