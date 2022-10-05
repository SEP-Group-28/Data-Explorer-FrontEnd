import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import Loader from "../../components/loader/Loader"
import { useLocation } from 'react-router'
import { compare } from '../../utils/functions'
import { removeDuplicates } from "../../utils/functions";

function StockChart ({ market, interval }) {

  const location = useLocation()

  try{
    var marketState = location.state.market;
  }catch(error){
    marketState="TSLA";
  }
    var intervalState = location?.state?.interval || "5m";
  
  const ref = React.useRef()
  const [loading, setLoading] = useState(false)

  const [chartData, setChartData] = useState([])

  const chart = useRef()
  const candleSeries = useRef()



  useEffect(() => {
      setLoading(true)
      chart.current = createChart(ref.current, {
        width: 0,
        height: 0,
        layout: {
          backgroundColor: "#393C45",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },

      });
      candleSeries.current = chart.current.addCandlestickSeries({
        upColor: "rgba(0,133,48,1)",
        downColor: "rgba(162,0,0,1)",
        borderDownColor: "rgba(162,0,0,1)",
        borderUpColor: "rgba(0,133,48,1)",
        wickDownColor: "rgba(162,0,0,1)",
        wickUpColor: "rgba(0,133,48,1)",
      });
      
      chart.current.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
           secondsVisible: false
        }
      })
      

      fetch("http://127.0.0.1:5000" + `/stockhistory/${market || marketState}/${interval || intervalState}`)
        .then((res) => res.json())
        .then((data) => {
          let fetchedData = [];
          // let tempTimeLine = [];
          data.forEach((row) => {
            let object = {
              time: row[0]/1000 ,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4],
            };
            fetchedData.push(object);
          });
          let tempChartData = removeDuplicates(fetchedData
          ).sort(compare);

          candleSeries.current.setData(fetchedData);
          setChartData(tempChartData);
          setLoading(false);
          chart.current.resize(1000, 380);

        })
          .catch();

      return () => {
        chart.current.remove()   
      }
  }, [market,interval])

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimension()
  // );

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimension());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     chart.current.resize(windowDimensions["width"] * 0.85, 380);
  //   };
  // });

  return (
    <>
      {loading ? <Loader position="relative" left="46.5%" top="9%"/> : null}
      <div className='StockChart' ref={ref}  />
    </>
  )
}

export default StockChart
