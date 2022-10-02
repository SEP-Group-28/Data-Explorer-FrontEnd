import React from 'react'
import { Navigate } from 'react-router-dom';
import Bitcoin from "../../assets/bitcoin.png";
import Etherium from "../../assets/etherium.png";



function CryptoSec() {


  return (
    
      <div
        onClick={() => {
          <Navigate to="/crypto" state={{ market : "BTC"}} />;
        }}
        className="CryptoSec d-flex flex-column"
      >
        <div className="crypto-imgs d-flex flex-row ">
          <img id="img1" src={Bitcoin} alt="" />
          <img id="img2" src={Etherium} alt="" />
        </div>
      <header>Crypto</header>
      <p data-testid='cryptoDesc'>
        You can analyse the real time crypto curerncies in time frames. This
        website allows you to view the crypto price variations in candle stick
        charts
      </p>
      <span >Click to analyse</span>
    </div>
  );
}

export default CryptoSec
