import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Loader from "../../components/loader/Loader";
import { useLocation } from "react-router";
import { compare } from "../../utils/functions";
import { removeDuplicates } from "../../utils/functions";
import { getLineChart } from "../../components/technicalIndicators/lineSeries";
import { getBbandsChart } from "../../components/technicalIndicators/bbandsIndicator";
import config from "../../config.json";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData, updateDataLimit, updateTimeStamp } from "../../redux/chart";

function StockChart({ market, interval, internalIndicators }) {
  const location = useLocation();

  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "TSLA";
  }
  var intervalState = location?.state?.interval || "5m";

  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const chart = useRef();
  const candleSeries = useRef();
  const volumeSeries = useRef();
  const dispatch = useDispatch();

  const { chartData, volumeData, chartType ,timeStamp,dataLimit } = useSelector((state) => state.chart);
  const [visibleLogicalRange, setVisibleLogicalRange] = useState({});
  const arr= []

  const { ma, sma, ema, wma, bbands } = internalIndicators;

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    // dispatch(updateDataLimit(280));
    // dispatch(updateTimeStamp(0));
    console.log("Chart data", chartData)
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
      downColor: "#851D1A",
      borderDownColor: "#851D1A",
      borderUpColor: "rgba(0,133,48,1)",
      wickDownColor: "#851D1A",
      wickUpColor: "rgba(0,133,48,1)",
    });

    volumeSeries.current = chart.current.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    });

    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    fetch(
      "http://127.0.0.1:5000" +
        `/stockhistory/${market || marketState}/${interval || intervalState}/0/${dataLimit}`
    )
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        // let tempTimeLine = [];
        let tempVolume = [];
        data.forEach((row) => {
          let object = {
            time: row[0] / 1000,
            open: row[1],
            high: row[2],
            low: row[3],
            close: row[4],
          };
          let volume = {
            time: row[0]/1000,
            value: row[5],
            color: row[1] > row[4] ? "#834C4B" : "#318B52",
          };
          fetchedData.push(object);
          tempVolume.push(volume);
        });
        let tempChartData = removeDuplicates([...fetchedData,...chartData]).sort(compare);
        let tempVolumeData = removeDuplicates([...tempVolume,...volumeData]).sort(compare);

        candleSeries.current.setData(tempChartData);
        volumeSeries.current.setData(tempVolumeData);
        dispatch(updateChartData({
          chartData:tempChartData,
          volumeData:tempVolumeData
        }))
        setLoading(false);
        console.log("chart data is",chartData)
      })
      .catch();

    if (ma) {
      const maLineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "MA",
        color: "blue",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ma/stock/` +
          `${market || marketState}/${interval || intervalState}`,
        maLineSeries,"stock"
      );
    }
    if (sma) {
      const smalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "SMA",
        color: "red",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/sma/stock/` +
          `${market || marketState}/${interval || intervalState}`,
        smalineSeries,
        "stock"
      );
    }
    
    if (ema) {
      const emalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "EMA",
        color: "#0397EC",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ema/stock/` +
          `${market || marketState}/${interval || intervalState}`,
        emalineSeries,
        "stock"
      );
    }
    if (wma) {
      const wmalineSeries = chart.current.addLineSeries({
        lineWidth: 1,
        title: "WMA",
        color: "#C5EC03",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/wma/stock/` +
          `${market || marketState}/${interval || intervalState}`,
        wmalineSeries,
        "stock"
      );
    }
    if (bbands) {
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
        `${config.DOMAIN_NAME}/bbands/stock/` +
          `${market || marketState}/${interval || intervalState}`,
        bbandUpperSeries,
        bbandMiddleSeries,
        bbandLowerSeries,"stock"
      );
    }

    function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
      setVisibleLogicalRange(newVisibleLogicalRange);
    }

    chart.current
      .timeScale()
      .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);

    return () => {
      chart.current.remove();
      dispatch(updateChartData({
        chartData:[],
        volumeData:[],
      }))
      console.log("chart data is", chartData)
      dispatch(updateDataLimit(280))
      dispatch(updateTimeStamp(0))
      
    };
  }, [market, interval, internalIndicators]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    timeStamp !== 0 &&
      fetch(
        "http://127.0.0.1:5000" +
          `/stockhistory/${market || marketState}/${
            interval || intervalState
          }/${timeStamp}/${dataLimit}`
      )
        .then((res) => res.json())
        .then((data) => {
          let fetchedData = [];
          // let tempTimeLine = [];
          let tempVolume = [];
          data.forEach((row) => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4],
            };
            let volume = {
              time: row[0] / 1000,
              value: row[5],
              color: row[1] > row[4] ? "#834C4B" : "#318B52",
            };
            fetchedData.push(object);
            tempVolume.push(volume);
          });
          let tempChartData = removeDuplicates([
            ...fetchedData,
            ...chartData,
          ]).sort(compare);
          let tempVolumeData = removeDuplicates([
            ...tempVolume,
            ...volumeData,
          ]).sort(compare);

          candleSeries.current.setData(tempChartData);
          volumeSeries.current.setData(tempVolumeData);
          dispatch(updateChartData({
            chartData: tempChartData,
            volumeData: tempVolumeData
          }))
          setLoading(false);
          
          // chart.current.resize(1000, 380);
        })
        .catch();
  }, [dataLimit]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // chart.current.resize(windowDimensions["width"] * 0.85, 380);
      const width = windowDimensions["width"];
      if (width >= 1220) {
        chart.current.resize(1067, 395);
      }
      if (width >= 1070 && width < 1220) {
        chart.current.resize(930, 380);
      }
      if (width >= 900 && width < 1070) {
        chart.current.resize(800, 380);
      }
      if (width >= 800 && width < 900) {
        chart.current.resize(670, 380);
      }
      if (width >= 650 && width < 800) {
        chart.current.resize(540, 380);
      }
      if (width >= 550 && width < 650) chart.current.resize(430, 340);
      if (width >= 478 && width < 550) {
        chart.current.resize(380, 320);
      }
      if (width > 350 && width < 478) chart.current.resize(320, 280);
    };
  });

  const loadPrevious = () => {
    console.log("Previous stamp is", timeStamp);
    if (visibleLogicalRange.from < 0) {
      let loadData = Math.ceil(Math.abs(visibleLogicalRange.from));
      console.log(loadData);
      console.log(visibleLogicalRange.from);
      dispatch(updateTimeStamp(timeStamp + dataLimit));
      dispatch(updateDataLimit(loadData))
    }
    console.log("Next stamp is", timeStamp);
  };

  return (
    <>
      {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null}
      <div
        className="StockChart"
        ref={ref}
        onMouseUpCapture={loadPrevious}
        onTouchEnd={loadPrevious}
      />
    </>
  );
}

export default StockChart;
