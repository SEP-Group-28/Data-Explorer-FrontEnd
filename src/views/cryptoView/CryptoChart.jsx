import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";


function CryptoChart() {
    const [visibleRange, setVisibleRange] = useState({});
    const [loading, setLoading] = useState(true);
    const ref =useRef();
    const chart = useRef();
    const candleSeries = useRef();
    const [market,setMarket] = useState(BTC)
    const [timeInterval,setTimeInterval] = useState("1m")

    useEffect(()=>{
        setLoading(true)
        chart.current = createChart(ref.current, {
          width: 0,
          height: 0,
          layout: {
            backgroundColor: "#000000",
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
          rightPriceScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
          },
          timeScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
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

    })




  return <div></div>;
}

export default CryptoChart;
