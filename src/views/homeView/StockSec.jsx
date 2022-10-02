import React from "react";
import { Navigate } from "react-router-dom";
import Stock1 from "../../assets/stock1.png";
import Stock2 from "../../assets/stock2.png";

function StockSec() {
  return (
    <div
      onClick={() => {
        <Navigate to="/stock" state={{ market: "TSLA" }} />;
      }}
      className="CryptoSec d-flex flex-column"
    >
      <div className="stock-imgs d-flex flex-row ">
        <img id="img1" src={Stock1} alt="" />
        <img id="img2" src={Stock2} alt="" />
      </div>
      <header style={{marginTop:"10px"}}>Stock</header>
      <p data-testid='stockDesc'>
        View the stock market price variations and analyse them in time frames.
        Make back testing easier with candlestick charts
      </p>
      <span>Click to analyse</span>
    </div>
  );
}

export default StockSec;
