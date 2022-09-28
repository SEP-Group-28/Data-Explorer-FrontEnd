import React from 'react'

function StockIntervals() {
   const intervals = ["1m", "5m", "15m", "30m", "1h", "1d"];

   const handleClick = (e) => {
     console.log("value is ", e.target.value);
   };
   return (
     <div className="CryptoIntervals crypto-bar">
       <div className="d-flex flex-row justify-content-evenly">
         <IndicatorMenuOne />
         <IndicatorMenuTwo />
       </div>
       <div className="d-flex flex-row justify content-center">
         <header>Time interval</header>
         <div className="interval-btns">
           {intervals.map((interval) => {
             return (
               <button
                 type="button"
                 className="interval-btn"
                 onClick={handleClick}
                 key={interval}
                 value={interval.match(/\d/g).join("")}
               >
                 {interval}
               </button>
             );
           })}
         </div>
       </div>
     </div>
   );
}

export default StockIntervals