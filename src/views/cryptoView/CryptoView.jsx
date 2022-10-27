import React, { useState, useEffect } from "react";
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Badge from '@mui/material/Badge';
import Alert from '../alert/Alert';
import Box from "@mui/material/Box";

function CryptoView() {
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const [internalIndicators, setInternalIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });

  useEffect(() => {
    setInternalIndicators({
      ma: false,
      sma: false,
      ema: false,
      wma: false,
      bbands: false,
    });
  }, [market]);
  const changeCryptoType = (marketType) => {
    setMarket(marketType);
  };
  const changeInterval = (interval) => {
    setInterval(interval);
  };
  // for alert
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // getting user
  try {
    var user = jwtDecode(Token.getAccessToken());
  } catch (err) {
    user = null;
  }
  
  user = true
  const addInternalIndicators = (indicators) => {
    setInternalIndicators(indicators);
  };
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader market={market} interval={interval} />
          <CryptoIntervals
            changeInterval={changeInterval}
            timeInterval={interval}
            addInternalIndicators={addInternalIndicators}
          />
          <CryptoChart
            market={market}
            interval={interval}
            internalIndicators={internalIndicators}
          />
        </div>
        <div className="types-crypto">
          <CryptoTypes changeCryptoType={changeCryptoType} />
        </div>
        {/* alert button */}
        {/* TODO: 
        fix css of the alert button */}
        { user &&
          <Box>
            <AccessAlarmsIcon sx={{color:'white', transform:'scale(2)'}} onClick={handleOpen}
            />
            <Alert
              open={open}
              onClose={handleClose}
            />
          </Box>
        }
      </div>
    </div>
  );
}

export default CryptoView
