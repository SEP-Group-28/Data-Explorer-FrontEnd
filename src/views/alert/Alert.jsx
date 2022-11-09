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

export default function Alert({market}) {
    // popover
    const [anchorEl, setAnchorEl] = useState(null);

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
    const handleRemove = async(event, data) => {
      console.log("removing data :", data)
      const response = await AlertServices.removeAlert(data);
      console.log("remove response, ", response)
    };
    // const handleAddAlert = () => {
    //   console.log("market received ", market);
      
    //   // const response = AlertServices.addAlert(market);
    // };

    // handeling adding of alerts
    // [count, setCount] = useState(0)
    const handleSetAlert = async() => {
      console.log("going to add an alert now")
      console.log("alert set called ", state.value[0])
      const value = state.value[0]
      console.log("data : ", data)
      var flag = false
      // data.map(obj => {
      //   if (obj.crypto_name = market+'/USDT' && obj.crypto_price == value){
      //     console.log("passing...");
      //   }
      // })
      for (let obj of data){
        // let obj = data[i]
        if (obj.crypto_name = market+'/USDT' && obj.crypto_price == value){
          flag = true
          console.log("found duplicate")
          break
        }
      
      }
      if(!flag){
      const newAlert = {crypto_name: market,
                        crypto_price: value
                      }
      // const data_ = data                
      // data_.push(newAlert)
      // setData(data_)
      const response = await AlertServices.addAlert(newAlert);
      
      getAlerts()
      console.log("alert response :", response)
      }
    }
       
    const getAlerts = async() => {
      const response = await AlertServices.getAllAlerts();
      console.log("alerts, ",response.data)
      const rows = response.data
      console.log("data, ", rows)
      setData(rows)
      console.log('fectching alerts', data);
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
    // console.log("interval, ", interval)

    // const dummy = 
    // [
    //     {
    //         crypto_name:"BTC",
    //         crypto_price :"19219",
    //     },
    //     {
    //         symbol:"SOL",
    //         value :"2832",
    //     },
    //     {
    //         symbol:"ETH",
    //         value :"2324",
    //     },
    // ];
    const [data, setData] = useState([]);
    console.log("the data", data)
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
              <AlarmAddOutlinedIcon onClick={(event)=>handleClick(event)}/>
            </th>
          </tr>
          <tr>
            <th>Cryptocurrency</th>
            <th></th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        {console.log("table")}
        {console.log("the set data , ", data)}
        <tbody>
          {data?.map((data) => {
            {console.log(data, " data")}
            return (
              <tr key={data.crypto_price}>
                <td className="d-flex flex-row" align='center'>
                  {data.crypto_name}  
                </td>
                <td>
                  crossing
                </td>
                <td>
                  {data.crypto_price}
                </td>
                <td>
                <Button 
                startIcon={<DeleteIcon style={{position:'relative', left:'40%'}}/>}
                color="primary"
                sx= {{pr:3, pl:3, w:'auto', maxHeight:'5px'}}
                onClick={(event) =>{
                  //console.log("cell values", cellValues)
                  handleRemove(event, data);
                }}
                
                >
                </Button>
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
        // style={{color:"blue"}}
      >
          <Form className='alertForm'>
            <Form.Group className="mb-3" controlId="formBasicMarket">
              <Form.Label>Cryptocurrency</Form.Label>
              <Form.Control type="text" placeholder={market} disabled={true}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicValue">
              <Form.Label>Value</Form.Label>
              <Form.Control name='value' type='number' step="0.01" min='0' placeholder="Enter Value" onChange={handleChange}/>
            </Form.Group>
            <Button className="login-btn signup-btn" id="alert-btn" onClick={handleSetAlert}>
              Set Alert
            </Button>
        </Form>
      </Popover>
    </div>
    );
}
