import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import config from "../../config.json";
import Loader from "../../components/loader/Loader";

function MACDChart({ market, interval}) {
  const ref = React.useRef();
  const chart = useRef();
  const macdSeries = useRef();
  const macdSignalSeries = useRef();
  const macdHistSeries = useRef();

  return <div></div>;
}

export default MACDChart;
