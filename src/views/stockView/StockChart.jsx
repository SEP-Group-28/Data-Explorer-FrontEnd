import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import Loader from "../../components/loader/Loader"
import { useLocation } from 'react-router'
// import ChartLoader from '../Loading/ChartLoader'

import { compare } from '../../utils/functions'

function StockChart ({ market, interval }) {

    function getWindowDimension() {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
    }

    
  const location = useLocation()

  try{
    var marketState = location.state.market;
  }catch(error){
    marketState="TSLA";
  }
    var intervalState = location?.state?.interval || "5m";
  
  const ref = React.useRef()
  const [loading, setLoading] = useState(false)
  // const [visibleRange, setVisibleRange] = useState({})

  const [chartData, setChartData] = useState([])
  // const [timeLine,setTempTimeLine]=useState([])

  const chart = useRef()
  const candleSeries = useRef()
  // const [timeStamp,setTimeStamp] = useState(0);

  const removeDuplicates = arr => {
    const seen = new Set()
    // noinspection UnnecessaryLocalVariableJS
    const filteredArr = arr.filter(el => {
      const duplicate = seen.has(el.time)
      seen.add(el.time)
      return !duplicate
    })
    return filteredArr
  }

  // useEffect(() => {
  //   const { ma, sma, ema, wma, bbands } = internalIndicators
  // }, [internalIndicators])
  // const { ma, sma, ema, wma, bbands } = internalIndicators

  useEffect(() => {
      setLoading(true)
      chart.current = createChart(ref.current, {
        width: 1000,
        height: 350,
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
          // secondsVisible: true
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
            // tempTimeLine.push(object.time);
          });
          console.log("Chart data is",chartData);
          let tempChartData = removeDuplicates([
            ...fetchedData,
            ...chartData,
          ]).sort(compare);

          // let chars = [...tempTimeLine, ...timeLine];
          // let tempTimeLineData = chars.filter((c, index) => {
          //   return chars.indexOf(c) === index;
          // });
          // console.log("temp data is", tempChartData);
          candleSeries.current.setData(fetchedData);
          setChartData(tempChartData);
          // setTempTimeLine(tempTimeLineData);
          setLoading(false);


          // function onVisibleTimeRangeChanged(newVisibleTimeRange) {
          //   setVisibleRange(newVisibleTimeRange);
          // }

          // chart.current
          //   .timeScale()
          //   .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged);
          // chart.current
          //   .timeScale()
          //   .setVisibleLogicalRange({ from: 0, to: 150 });
          // chart.current.timeScale().scrollToPosition(1);
        })
          .catch();

      return () => {
        console.log("returning")
        chart.current.remove()   
      }
  }, [market,interval])

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimension());


  // useEffect(() => {
    
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimension());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () =>{ 
  //     window.removeEventListener("resize", handleResize)
  //     chart.current.resize(windowDimensions["width"]*(0.85), 350);
  // };
  // });

  // useEffect(() => {
  //   timeStamp !== 0 &&
  //     fetch(
  //       BASE_URL +
  //         `${marketType}/historical/${market}/${timeInterval}/${timeStamp}000`
  //     )
  //       .then(res => res.json())
  //       .then(data => {
  //         let fetchedData = []
  //         let tempTimeLine = []
  //         data.forEach(row => {
  //           let object = {
  //             time: row[0] / 1000,
  //             open: row[1],
  //             high: row[2],
  //             low: row[3],
  //             close: row[4]
  //           }
  //           fetchedData.push(object)
  //           tempTimeLine.push(object.time)
  //         })
  //         let tempChartData = removeDuplicates([
  //           ...fetchedData,
  //           ...chartData
  //         ]).sort(compare)

  //         let chars = [...tempTimeLine, ...timeLine]
  //         // console.log('timeLine', timeLine)
  //         // console.log('timeStamp', timeStamp)
  //         let tempTimeLineData = chars.filter((c, index) => {
  //           return chars.indexOf(c) === index
  //         })

  //         candleSeries.current.setData(tempChartData)
  //         // setChartData([...chartData, ...fetchedData])

  //         // dispatch(
  //         //   updateChartData({
  //         //     chartData: tempChartData,
  //         //     timeLine: tempTimeLineData
  //         //   })
  //         // )
          
  //       })
  //       .catch()
  // }, [timeStamp])

  // const handleDrag = () => {
  //   console.log('api call to load data')
  //   console.log(visibleRange.from)
  //   if (timeLine[0] === visibleRange.from) {
  //     // setTimeStamp(visibleRange.from)
  //     setTimeStamp(visibleRange.from)
  //   }
  // }

  return (
    <>
      {loading ? <Loader /> : null}
      <div className='StockChart' ref={ref}  />
    </>
  )
}

export default StockChart
