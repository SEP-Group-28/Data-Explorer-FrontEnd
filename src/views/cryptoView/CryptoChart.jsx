import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from '../../utils/functions'
import { compare } from '../../utils/functions'
import {useLocation} from "react-router-dom"
import Loader from "../../components/loader/Loader";
import config from "../../config.json"
import { getMAChart } from "../../components/technicalIndicators/maChart";

function CryptoChart({ market, interval,internalIndicators }) {
  const location = useLocation();
  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "BTC";
  }
  var intervalState = location?.state?.interval || "1m";

  const [internalIndicatorState,setInternalIndicatorState] =useState(internalIndicators);
  
  // useEffect(() => {
  //   setInternalIndicatorState({
  //     ma: false,
  //     sma: false,
  //     ema: false,
  //     wma: false,
  //     bbands: false,
  //   });
  // }, [market]);


  const { ma, sma, ema, wma, bbands } = internalIndicators;
  

  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const chart = useRef();
  const candleSeries = useRef();
  const lineSeries = useRef();

  const [chartData, setChartData] = useState([]);
  const [timeLine, setTimeLine] = useState([]);
  
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
        secondsVisible: false,
        autoScale: false,
        shiftVisibleRangeOnNewBar: true,
      },
      priceScale: {
        autoScale: true,
      },
    });

    let newCrypto =
      config.DOMAIN_NAME+"/history/" +
      `${market || marketState}/${interval || intervalState}`;

    fetch(newCrypto)
      .then((res) => res.json())
      .then((data) => {
        let tempCandlesticks = [];
        let tempTimeLine = [];
        data.data.forEach((row) => {
          let object = {
            time: row[0],
            open: row[1],
            high: row[2],
            low: row[3],
            close: row[4],
          };
          tempTimeLine.push(object.time);
          tempCandlesticks.push(object);
        });
        let tempChartData = removeDuplicates(tempCandlesticks).sort(compare);

        candleSeries.current.setData(tempChartData);
        setLoading(false);
        chart.current.resize(1067, 380);
      })
      .catch();

    let eventSource = new EventSource(
      `${config.DOMAIN_NAME}/present/` +`${market || marketState}/${interval || intervalState}`
    );
    eventSource.addEventListener(
      "message",
      function (e) {
        let parsedData = JSON.parse(e.data);
        let object = {
          time: parsedData[0],
          open: parsedData[1],
          high: parsedData[2],
          low: parsedData[3],
          close: parsedData[4],
        };
        candleSeries.current.update(object);
      }
    );

    if(ma){
      const maLineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "MA",
        color:"blue",
      });
      getMAChart(
        `${config.DOMAIN_NAME}/ma/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        maLineSeries
      );

      
      // // console.log(maData);
      // fetch( `${config.DOMAIN_NAME}/ma/crypto/` +
      //    `${market || marketState}/${interval || intervalState}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (!data.hasOwnProperty("error")) {
      //       let tempLines = [];
      //       for (let i in data) {
      //         if (data.hasOwnProperty(i)) {
                
      //           let object = {
      //             time:Number(i) ,
      //             value: data[i],
      //           };
      //           tempLines.push(object);
      //         }
      //       }
      //       console.log(tempLines);
      //       let tempLineData = removeDuplicates(tempLines);
      //       console.log(tempLineData);
      //       lineSeries.current.setData(tempLineData);
      //     }
      //   })
      //   .catch();
      
    }
    if (sma) {
      const smalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "SMA",
        color: "red",
      });
      getMAChart(
        `${config.DOMAIN_NAME}/sma/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        smalineSeries
      );
    }

    return () => {
      chart.current.remove();
      eventSource.close();
      setChartData([]);
      setTimeLine([]);
    };
  }, [market, interval,internalIndicators]);

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

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
      {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null}
      <div className="CryptoChart" ref={ref}></div>;
    </>
  );
  
   
}


export default CryptoChart;
