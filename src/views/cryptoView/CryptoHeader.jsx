import React from 'react'
import { Button } from 'react-bootstrap'

function CryptoHeader() {
  const handleClick=()=>{
    console.log("hey")
  }
  return (
    <div className="CryptoHeader crypto-bar">
      <header>BTCUSD</header>
      <div className="d-flex flex-row justify-content-evenly">
        <p>Volume </p>
        <p>Total high </p>
        <p>Total low</p>
      </div>
      <button type="button" onClick={handleClick} className="watchlist-btn">Add to watchlist</button>
    </div>
  );
}

export default CryptoHeader
