import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from '../../utils/functions'
import { compare } from '../../utils/functions'
import {useLocation} from "react-router-dom"

function CryptoChart({ market, interval }) {
  const location = useLocation();
  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "BTC";
  }
  var intervalState = location?.state?.interval || "1m";

  const [visibleRange, setVisibleRange] = useState({});
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  const chart = useRef();
  const candleSeries = useRef();

  const [timeInterval, setTimeInterval] = useState("1m");
  const [chartData, setChartData] = useState([]);
  const [timeLine, setTimeLine] = useState([]);
  useEffect(() => {
    setLoading(true);
    chart.current = createChart(ref.current, {
      width: 0,
      height: 300,
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
        secondsVisible: true,
        autoScale: false,
        shiftVisibleRangeOnNewBar: false,
      },
      priceScale: {
        autoScale: true,
      },
    });

    let newCrypto =
      "http://127.0.0.1:5000/history/" +
      `${market || marketState}/${interval || intervalState}`;

    fetch(newCrypto)
      .then((res) => res.json())
      .then((data) => {
        let tempCandlesticks = [];
        let tempTimeLine = [];
        data.data.forEach((row) => {
          let object = {
            time: row[0] / 1000,
            open: row[1],
            high: row[2],
            low: row[3],
            close: row[4],
          };
          tempTimeLine.push(object.time);
          tempCandlesticks.push(object);
          // console.log(object)
        });
        let tempChartData = removeDuplicates([
          ...tempCandlesticks,
          ...chartData,
        ]).sort(compare);
        // let tempTimeLineData = removeDuplicates([
        //   ...tempTimeLine,
        //   ...timeLine
        // ]).sort(compare)
        let chars = [...tempTimeLine, ...timeLine];
        let tempTimeLineData = chars.filter((c, index) => {
          return chars.indexOf(c) === index;
        });

        // console.log(tempTimeLineData)

        // candleSeries.current.setData(tempCandlesticks)
        console.log("temp", tempCandlesticks);
        candleSeries.current.setData(tempChartData);
        setChartData(tempChartData);
        setTimeLine(tempTimeLineData);
      })
      .catch();

    let eventSource = new EventSource(
      "http://127.0.0.1:5000/present/" +
        `${market || marketState}/${
          interval || intervalState
        }`
    );

    eventSource.addEventListener(
      "message",
      function (e) {
        let parsedData = JSON.parse(e.data);

        // console.log(parsedData)

        let object = {
          time: parsedData[0],
          open: parsedData[1],
          high: parsedData[2],
          low: parsedData[3],
          close: parsedData[4],
        };
        candleSeries.current.update(object);
        console.log(object);
      },
      false
    );

    return () => {
      chart.current.remove();
      eventSource.close();
      setChartData([]);
      setTimeLine([]);
    };
  }, [market, timeInterval]);

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

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
      chart.current.resize(windowDimensions["width"] * 0.85, 300);
    };
  });

  return <div className="CryptoChart" ref={ref}></div>;
}


export default CryptoChart;
