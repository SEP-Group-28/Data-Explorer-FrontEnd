import React from "react";
import HeaderTwo from "../../components/headers/HeaderTwo";
import AlertDetails from "./AlertDetails";
import CryptoSec from "./CryptoSec";
import HomeSubOne from "./HomeSubOne";
import HomeSubTwo from "./HomeSubTwo";
import StockSec from "./StockSec";
import Slide from "react-reveal/Slide";
import Footer from "./Footer";

function HomeView() {
  return (
    <div className="homeView ">
      <HeaderTwo />
      <div
        id="carouselExampleInterval"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
            <HomeSubOne />
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <HomeSubTwo />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

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
        <Slide left duration={1500}>
          <CryptoSec className="crypto-comp" />
        </Slide>
        <Slide right duration={1500}>
          <StockSec className="stock-comp" />
        </Slide>
      </div>
      <AlertDetails />
      <Footer />
    </div>
  );
}

export default HomeView;
