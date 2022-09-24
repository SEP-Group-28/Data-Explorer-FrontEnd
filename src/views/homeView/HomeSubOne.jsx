import React from "react";
import Stock from "../../../public/Stock.png";
import StarIcon from "@mui/icons-material/Star";

function HomeSubOne() {
  return (
    <div className="HomeSubOne d-flex flex-row justify-content-evenly white">
      <div className="subOne-details">
        <header><span className="logo-name">Crypto|X|plorer</span> <span className="main-title">Stock analysis</span></header>
        <h3 ><span className="h3-first">Analyse</span> <span className="h3-second">stock market data</span></h3>
        <div className="detail-list d-flex flex-column">
            <p><span className="start-span"><StarIcon className="star-icon" /></span><span className="blue-keyword"> Visualize </span> <span> stock charts</span></p>
            <p><span className="start-span"><StarIcon className="star-icon" /></span><span className="blue-keyword"> Backtest </span> <span> with your own strategies</span></p>
            <p><span className="start-span"><StarIcon className="star-icon" /></span> <span> Make your predictions smartly</span></p>
        </div>
      </div>
      <div className="img-sec" >
        <img src={Stock} alt="" />
      </div>
    </div>
  );
}

export default HomeSubOne;
