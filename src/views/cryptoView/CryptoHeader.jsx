import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import config from "../../config.json"
import WatchlistServices from '../../services/WatchlistServices';
import jwtDecode from "jwt-decode";

function CryptoHeader({ market, interval }) {
  const [volume,setVolume] = useState(19000)

  const handleClick = async() => {
    const response = await WatchlistServices.addMarket({crypto:(market=="") ? marketState+"/USDT" : market+"/USDT"})
    console.log(response)
  };
  const location = useLocation();
  const marketState = "BTC";
  var intervalState = location?.state?.interval || "1m";

     try {
       var user = jwtDecode(Token.getAccessToken());
     } catch (err) {
       user = null;
     }
  user=true
// useEffect(()=>{
//   let eventSource = new EventSource(
//     `${config.DOMAIN_NAME}/present/` +
//       `${market || marketState}/1d`)

//       eventSource.addEventListener(
//         "message",
//         function(e){
//           let parsedData = JSON.parse(e.data);
//           setVolume(parsedData[5]);
//         },
//       )
  
// },[market])
  
  return (
    <div className="CryptoHeader crypto-bar stock-header">
      <header className="stock-header">
        {market || marketState}/USDT - <span>{interval || intervalState}</span>
      </header>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="d-flex flex-column">
          <p>24hVolume</p>
          <span className="volume-value"></span>
        </div>
      </div>
      {user && (
        <button type="button" onClick={handleClick} className="watchlist-btn">
          Add to watchlist
        </button>
      )}
    </div>
  );
}

export default CryptoHeader
