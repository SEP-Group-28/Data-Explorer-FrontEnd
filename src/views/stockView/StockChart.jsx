import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Loader from "../../components/loader/Loader";
import { useLocation } from "react-router";
import { compare } from "../../utils/functions";
import { removeDuplicates } from "../../utils/functions";
import { getLineChart } from "../../components/technicalIndicators/lineSeries";
import { getBbandsChart } from "../../components/technicalIndicators/bbandsIndicator";
import config from "../../config.json";

function StockChart({ market, interval, internalIndicators }) {
  const location = useLocation();

  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "TSLA";
  }
  var intervalState = location?.state?.interval || "5m";

  const ref = React.useRef();
  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([]);

  const chart = useRef();
  const candleSeries = useRef();

  const { ma, sma, ema, wma, bbands } = internalIndicators;

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    setLoading(true);
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
      },
    });

    fetch(
      "http://127.0.0.1:5000" +
        `/stockhistory/${market || marketState}/${interval || intervalState}`
    )
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        // let tempTimeLine = [];
        data.forEach((row) => {
          let object = {
            time: row[0] / 1000,
            open: row[1],
            high: row[2],
            low: row[3],
            close: row[4],
          };
          fetchedData.push(object);
        });
        let tempChartData = removeDuplicates(fetchedData).sort(compare);

        candleSeries.current.setData(fetchedData);
        setChartData(tempChartData);
        setLoading(false);
        chart.current.resize(1000, 380);
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

    return () => {
      chart.current.remove();
    };
  }, [market, interval, internalIndicators]);

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
      const width = windowDimensions["width"];
      if (width >= 1220) {
        chart.current.resize(1067, 380);
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



  return (
    <>
      {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null}
      <div className="StockChart" ref={ref} />
    </>
  );
}

export default StockChart;
