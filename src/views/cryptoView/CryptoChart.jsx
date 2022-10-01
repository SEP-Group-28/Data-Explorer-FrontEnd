import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from '../../utils/functions'
import { compare } from '../../utils/functions'



function CryptoChart({market}) {
    const [visibleRange, setVisibleRange] = useState({});
    const [loading, setLoading] = useState(true);
    const ref =useRef();
    const chart = useRef();
    const candleSeries = useRef();
    const [marketdata,setMarket] = useState()
    const [timeInterval,setTimeInterval] = useState("1m")
    const [chartData, setChartData] = useState([])
    const [timeLine, setTimeLine] = useState([])
    useEffect(()=>{
        console.log(market)
        setMarket(market)

        setLoading(true)
        chart.current = createChart(ref.current, {
          width: 1000,
          height: 400,
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

        let newCrypto = 'http://127.0.0.1:5000/history/'+ `${market}/1m`

      fetch(newCrypto)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          console.log('got data........')
          let tempCandlesticks = []
          let tempTimeLine = []
          data.data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempTimeLine.push(object.time)
            tempCandlesticks.push(object)
            // console.log(object)
          })
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)
          // let tempTimeLineData = removeDuplicates([
          //   ...tempTimeLine,
          //   ...timeLine
          // ]).sort(compare)
          let chars = [...tempTimeLine, ...timeLine]
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          // console.log(tempTimeLineData)

          // candleSeries.current.setData(tempCandlesticks)
          console.log('temp', tempCandlesticks)
          candleSeries.current.setData(tempChartData)
          setChartData(tempChartData)
          setTimeLine(tempTimeLineData)
       
        }) .catch()

        console.log('print')
        market='SOL'
        let eventSource = new EventSource(
          'http://127.0.0.1:5000/present/' + `${market}/`+'1m'
        )
        eventSource.addEventListener(
          'message',
          function (e) {
      
            let parsedData = JSON.parse(e.data)
            
            console.log(parsedData)
            
            let object = {
              time: parsedData[0]/1000,
              open: parsedData[1],
              high: parsedData[2],
              low: parsedData[3],
              close: parsedData[4]
            }
            candleSeries.current.update(object)
            console.log(object)
          },
          false
        )
  
    },[market])

  return (<div style={{marginLeft:'100px',marginTop:'50px'}}
  ref={ref}>

  </div>);
}

export default CryptoChart;
