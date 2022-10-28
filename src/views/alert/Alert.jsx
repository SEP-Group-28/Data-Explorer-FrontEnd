import React, { Component } from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import '../../assets/css/watchlist.css'
import { autocompleteClasses, Container } from '@mui/material';
import Token from '../../services/Token';
import WatchlistServices from '../../services/WatchlistServices';
import Loader from '../../components/loader/Loader';
import { Table } from 'react-bootstrap'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AlertServices from '../../services/AlertServices';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';

export default function Alert({market, interval}) {
    // popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      console.log("target event ", event.currentTarget)
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // handling removing alerts
    const handleRemove = () => {
      const response = AlertServices.removeAlert();
    };
    // const handleAddAlert = () => {
    //   console.log("market received ", market);
      
    //   // const response = AlertServices.addAlert(market);
    // };

    // handeling adding of alerts
    const handleSetAlert = () => {
      console.log("alert set called ", state)
      console.log("data : ", data)
      dummy.map(obj => {
        if (obj.market = market && obj.value == state.value){
          console.log("passing...");
          return
        }
      })
      const newAlert = {symbol: market,
                        value: value}
      data_ = data                
      data_.push(newAlert)
      setData(data_)
      const response = AlertServices.addAlert(newAlert);
    }

    const getAlerts = async() => {
      const rows = await AlertServices.getAlerts();
      setData(rows)
    }

    console.log("loaded alerts")
    
    // const [value, setValue] = useState(0);
    const targetPrice = {value : ''}
    const [state, setState] = useState(targetPrice)

    const handleChange = (e) => {
      console.log("float, ", parseFloat(e.target.value))
      setState({
        ...state, 
        [e.target.name] : [parseFloat(e.target.value)]
      })
    } 
    console.log("interval, ", interval)

    const dummy = 
    [
        {
            symbol:"BTC",
            value :"19219",
        },
        {
            symbol:"SOL",
            value :"2832",
        },
        {
            symbol:"ETH",
            value :"2324",
        },
    ];
    const [data, setData] = useState();

    useEffect( () => {
      getAlerts();
    }, [])

    return(
    <div className="Alerts">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Alerts</th>
            <th>
              <AlarmAddOutlinedIcon onClick={handleClick}/>
            </th>
          </tr>
        </thead>
        {console.log("table")}
        <tbody>
          {dummy.map((data) => {
            {console.log(data, " data")}
            return (
              <tr key={data.symbol}>
                <td className="d-flex flex-row">
                  {data.symbol}  
                </td>
                <td>
                    crossing {data.value}
                </td>
                <td>
                    <RemoveCircleOutlineIcon onClick={handleRemove}/>
                </td>
                {/* <td>
                <p>{data.value}</p>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicMarket">
              <Form.Label>Cryptocurrency</Form.Label>
              <Form.Control type="text" placeholder={market} disabled={true}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicValue">
              <Form.Label>Value</Form.Label>
              <Form.Control name='value' type='number' step="0.01" min='0' placeholder="Enter Value" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSetAlert}>
              Set Alert
            </Button>
        </Form>
      </Popover>
    </div>
    );
}
