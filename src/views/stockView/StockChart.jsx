import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'

// import ChartLoader from '../Loading/ChartLoader'

import { compare } from '../../utils/functions'

function StockChart ({ market }) {
  const ref = React.useRef()
  const [loading, setLoading] = useState(true)
  const [visibleRange, setVisibleRange] = useState({})
  

  const [chartData, setChartData] = useState([])
  const [timeLine,setTempTimeLine]=useState([])

  const chart = useRef()
  const candleSeries = useRef()

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
        width: 0,
        height: 0,
        // layout: {
        //     backgroundColor: '#f2f2f2',
        //     textColor: 'rgba(255, 255, 255, 0.9)',
        // },
        // grid: {
        //     vertLines: {
        //         color: 'rgba(197, 203, 206, 0.5)',
        //     },
        //     horzLines: {
        //         color: 'rgba(197, 203, 206, 0.5)',
        //     },
        // },
        crosshair: {
          mode: CrosshairMode.Normal
        }
        // rightPriceScale: {
        //     borderColor: 'rgba(197, 203, 206, 0.8)',
        // },
        // timeScale: {
        //     borderColor: 'rgba(197, 203, 206, 0.8)',
        // },
      })
      candleSeries.current = chart.current.addCandlestickSeries({
        upColor: UP_CANDLESTICK_COLOUR,
        downColor: DOWN_CANDLESTICK_COLOUR
      })
      
      chart.current.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        }
      })

      fetch(
        BASE_URL +
          `${marketType}/historical/${market}/${timeInterval}/${timeStamp}000`
      )
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          let tempTimeLine = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
            tempTimeLine.push(object.time)
          })
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)

          let chars = [...tempTimeLine, ...timeLine]
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          candleSeries.current.setData(tempChartData)
        setChartData(tempChartData)
        setTempTimeLine(tempTimeLineData)
          
        })
        // const barsInfo = candleSeries.barsInLogicalRange(
        //   chart.current.timeScale().getVisibleLogicalRange()
        // )
        // console.log(barsInfo)
        // function onVisibleTimeRangeChanged (newVisibleTimeRange) {
        //   setVisibleRange(newVisibleTimeRange)
        // }

        // chart.current
        //   .timeScale()
        //   .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)

        .catch()

      return () => {
        chart.current.remove()
      }
    
  }, [market])

  useEffect(() => {
    timeStamp !== 0 &&
      fetch(
        BASE_URL +
          `${marketType}/historical/${market}/${timeInterval}/${timeStamp}000`
      )
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          let tempTimeLine = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
            tempTimeLine.push(object.time)
          })
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)

          let chars = [...tempTimeLine, ...timeLine]
          // console.log('timeLine', timeLine)
          // console.log('timeStamp', timeStamp)
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          candleSeries.current.setData(tempChartData)
          // setChartData([...chartData, ...tempCandlesticks])

          dispatch(
            updateChartData({
              chartData: tempChartData,
              timeLine: tempTimeLineData
            })
          )
          
        })
        .catch()
  }, [timeStamp])

  const handleDrag = () => {
    console.log('api call to load data')
    console.log(visibleRange.from)
    if (timeLine[0] === visibleRange.from) {
      // setTimeStamp(visibleRange.from)
      dispatch(updateTimeStamp(visibleRange.from))
    }
  }

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div ref={ref} onMouseUpCapture={handleDrag} />
    </>
  )
}

export default StockChart
