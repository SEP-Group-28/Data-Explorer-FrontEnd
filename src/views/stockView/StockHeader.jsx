import React from 'react'

function StockHeader() {
  return (
    <div>
      <div className="CryptoHeader crypto-bar stock-header">
        <header>LSE</header>
        <div className="d-flex flex-row justify-content-evenly">
          <p>Volume </p>
          <p>Total high </p>
          <p>Total low</p>
        </div>
      </div>
    </div>
  );
}

export default StockHeader
