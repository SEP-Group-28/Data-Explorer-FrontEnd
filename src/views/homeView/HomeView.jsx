import React from "react";
import HeaderTwo from "../../components/headers/HeaderTwo";
import AlertDetails from "./AlertDetails";
import CryptoSec from "./CryptoSec";
import HomeSubOne from "./HomeSubOne";
import StockSec from "./StockSec";

function HomeView() {
  return (
    <div className="homeView">
      <HeaderTwo />
      <HomeSubOne />
      <div className="app-description d-flex flex-column">
        <header>Crypto Stock Explorer is a platform where you can</header>
        <div className="app-details">
          <p>Analyse stock data and crypto currencies</p>
          <p>
            View real time data of crypto currencies and make the future price
            and volume variations easily
          </p>
          <p>Make your trading life simpler</p>
        </div>
      </div>
      <div className="market-cards">
        <CryptoSec className="crypto-comp"/>
        <StockSec className="stock-comp"/>
      </div>
      <AlertDetails/>
    </div>
  );
}

export default HomeView;
