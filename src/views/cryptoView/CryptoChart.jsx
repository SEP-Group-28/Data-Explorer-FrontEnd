import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from '../../utils/functions'
import { compare } from '../../utils/functions'
import {useLocation} from "react-router-dom"
import Loader from "../../components/loader/Loader";
import config from "../../config.json"
import { getLineChart } from "../../components/technicalIndicators/lineSeries";
import { getBbandsChart } from "../../components/technicalIndicators/bbandsIndicator";

function CryptoChart({ market, interval,internalIndicators }) {
  const location = useLocation();
  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "BTC";
  }
  var intervalState = location?.state?.interval || "1m";

  const [internalIndicatorState,setInternalIndicatorState] =useState(internalIndicators);
  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
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
        // autoScale: true,
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

      
    //  chart.current.timeScale().setVisibleLogicalRange({ from: 100, to: 150 });
    //  chart.current.timeScale().scrollToPosition(1, true);
    //  chart.current.timeScale().setVisibleRange(from:);

    if(ma){
      const maLineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "MA",
        color:"blue",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ma/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        maLineSeries,"crypto"
      );
      
    }
    if (sma) {
      const smalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "SMA",
        color: "red",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/sma/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        smalineSeries,"crypto"
      );
    }

    if (ema) {
      const emalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "EMA",
        color: "#0397EC",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ema/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        emalineSeries,"crypto"
      );
    }

    if (wma) {
      const wmalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "WMA",
        color: "#C5EC03",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/wma/crypto/` +
          `${market || marketState}/${interval || intervalState}`,
        wmalineSeries,"crypto"
      );
    }
    if(bbands){
       const bbandUpperSeries = chart.current.addLineSeries({
         lineWidth: 1,
         title: "BBAND Upper",
         color: "#022875",
       });

       const bbandMiddleSeries = chart.current.addLineSeries({
         lineWidth: 1,
         title: "BBAND Middle",
         color: "#0B3894",
       });

       const bbandLowerSeries = chart.current.addLineSeries({
         lineWidth: 1,
         title: "BBAND Lower",
         color: "#022875",
       });

       getBbandsChart(
         `${config.DOMAIN_NAME}/bbands/crypto/` +
           `${market || marketState}/${interval || intervalState}`,
         bbandUpperSeries,
         bbandMiddleSeries,
         bbandLowerSeries
       );
    }
    // console.log("Range", chart.current.timeScale().getVisibleRange());
    // function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
    //   console.log(newVisibleLogicalRange);
    // }

    // chart.current
    //   .timeScale()
    //   .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
      // chart.current.timeScale().setVisibleLogicalRange({
      //   from: -5,
      //   to: 150,
      // });
    

    return () => {
      chart.current.remove();
      eventSource.close();
      setChartData([]);
      setTimeLine([]);
    };
  }, [market, interval,internalIndicators]);

  

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // chart.current.resize(windowDimensions["width"] * 0.85, 380);
      const width = windowDimensions["width"]
       if (width >= 1220) {
         chart.current.resize(1067, 370);
       }
       if (width >= 1070 && width < 1220) {
         chart.current.resize(930, 370);
       } 
      if(width >=900 && width <1070){
        chart.current.resize(800, 370);
      }
      if(width >=800 && width <900){
        chart.current.resize(670, 370);
      }
      if(width>=650 && width <800){
        chart.current.resize(540, 370);
      }
      if(width >=550 && width <650)
        chart.current.resize(430,340)
      if(width >=478 && width <550){
        chart.current.resize(380,320)
      }
      if(width>350 && width <478)
        chart.current.resize(320,280)
      

    };
  });

  return (
    <>
      {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null}
      <div className="CryptoChart" ref={ref}></div>;
    </>
  );
  
   
}


export default CryptoChart;
