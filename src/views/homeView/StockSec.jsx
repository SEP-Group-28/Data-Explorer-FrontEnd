import React from "react";
import { Link } from "react-router-dom";
import Stock1 from "../../../public/stock1.png";
import Stock2 from "../../../public/stock2.png";

function StockSec() {
  return (
    <div
      onClick={() => {
        window.location.href = "/stock";
      }}
      className="CryptoSec d-flex flex-column"
    >
      <div className="stock-imgs d-flex flex-row ">
        <img id="img1" src={Stock1} alt="" />
        <img id="img2" src={Stock2} alt="" />
      </div>
      <header style={{marginTop:"10px"}}>Stock</header>
      <p>
        View the stock market price variations and analyse them in time frames.
        Make back testing easier with candlestick charts
      </p>
      <span>Click to analyse</span>
    </div>
  );
}

export default StockSec;
