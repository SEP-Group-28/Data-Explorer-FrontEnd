import React, { useState } from 'react'
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
  // const location = useLocation();
  // try {
  //   var defaultMarket = location.state.market;
  // } catch (error) {
  //   defaultMarket = "BTC";
  // }
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const changeCryptoType=(marketType)=>{
    setMarket(marketType);
  }
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
  return (
    <div className="CryptoView">
      <HeaderTwo />
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <CryptoHeader market={market} interval={interval} />
          <CryptoIntervals changeInterval={changeInterval}  timeInterval={interval}/>
          <CryptoChart market={market} interval={interval} />
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
