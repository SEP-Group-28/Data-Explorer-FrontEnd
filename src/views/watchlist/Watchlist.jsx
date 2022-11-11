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
import Swal from 'sweetalert2';
// const styles = theme => ({
//   activeSortIcon: {
//     opacity: 1,
//     color : 'blue',
//   },
//   inactiveSortIcon: {
//     opacity: 0.4,
//     color : 'green',
//   },
// });

// const rows = [
//   { id: 1, symbol: 'BTCUSD', price: 4343, high: 5554, low: 3544, volume: 456024 },
//   { id: 2, symbol: 'BTCUSD', price: 4344, high: 5554, low: 3544, volume: 456024 },
//   { id: 3, symbol: 'BTCUD', price: 4344, high: 5554, low: 3544, volume: 456024 },
//   { id: 4, symbol: 'BTCSD', price: 43435, high: 5554, low: 3544, volume: 456024 },
//   { id: 5, symbol: 'BTCUSD', price: 43432, high: 5554, low: 3544, volume: 456024 },
//   { id: 6, symbol: 'BTCUSD', price: 43431, high: 5554, low: 3544, volume: 456024 },
//   { id: 7, symbol: 'BTCUSD', price: 434322, high: 5554, low: 3544, volume: 456024 },
//   { id: 8, symbol: 'BTCSD', price: 43431, high: 5554, low: 3544, volume: 456024 },
//   { id: 9, symbol: 'BTCUSD', price: 4343, high: 5554, low: 3544, volume: 456024 }
// ]
export default function Watchlist() {
  
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [eventSources, setEventSources] = useState([])
  const [records, setRecords] = useState(new Map())
  const handleDelete = async(e, id, symbol) => {
    console.log("handle delete ", symbol)
    const response = await WatchlistServices.removeMarket(symbol)
    console.log("response :", response)
    // setData(response.data.data)
    // setEventSources([])
    // records.delete(id)
    // setRecords(records)
    // console.log("records :", records)
    // console.log("before delete",rows)
    // const index = rows.indexOf(id)
    // if(index >= 0){
    //   rows.splice(index, 1)
    //   setRows(rows)
    // }
    // console.log("after delete",rows)
    let record_ = records
    record_.delete(symbol)
    console.log("table records", record_)
    setRecords(record_)
    if (response.status === 200) {
      Swal.fire({
        title: `${symbol}`,
        text: 'Removed from watchlist successfully',
        icon: 'success',
        background:'#111726',
        showConfirmButton: false,
        color:'white',
      })
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    }
    else{
      Swal.fire({
        title: `Error removing ${symbol} from watchlist`,
        text: response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
        background:'#111726',
        color:'white',
      })
    }
  }
  
  const [itemArr, setItemArr] = useState([])
  const userDecode = Token.getAuth()
  const user_id = userDecode['user_id']
  
  useEffect(()=>{
    getWatchlist()

  }, []);
  const getWatchlist = async() => {
    const response = await WatchlistServices.viewWatchlist()
    const data_ = response.data.data
    console.log("data of list", data_)
    if (data_==null)
      setData([])
    else
      setData(data_)
  };

  useEffect(()=>{
    let watcheventSource = null
    if (data !== null) {
      for (let i in data) {
          watcheventSource  = new EventSource( "http://127.0.0.1:5000/present/" + data[i].split('/')[0] + '/1m')
          watcheventSource.addEventListener(
            'message',
            function(e){
              let parsedData = JSON.parse(e.data)
              // console.log(parsedData)
              let object = {
                id: i,
                symbol: data[i],
                price: parseFloat(parsedData[4]).toFixed(4),
                high: parseFloat(parsedData[3]).toFixed(4),
                low: parseFloat(parsedData[2]).toFixed(4),
                volume: parseFloat(parsedData[5]).toFixed(4)
              }
              // console.log("Object", object)
              // setHighVal(parsedData.k.h)
              records.set(data[i], object)
              setRecords(records)
              setformat()
              // console.log("function call set format")
            }
          )
          eventSources.push(watcheventSource)
          setEventSources(eventSources)

      }
      
    }

    return () => {
      if (eventSources.length !== 0) {
        // console.log(eventSources)
        for (let eventsource of eventSources) {
          eventsource.close()
          // console.log('event source closed')
        }
        setEventSources([])
      }
    }

  },[data])

  // const handlePresentCrypto=(e,i) =>
  // eth:{id,symbl,price,high,low,volume},bth
  const setformat=()=>{

    // console.log("function inside : set format")
    const rows=[]
    for (let [key, value] of records){
      // console.log("key value", key, value)
      rows.push(value)
      
    }
    // console.log("rows:", rows)
    setRows(rows)
    console.log("rows", rows)
    setLoader(false)
  }
  const columns = [
    { field:'id', hide:true},
    { field: 'symbol', headerName: 'Symbol', width: 150, headerAlign:'center', align:'center' },
    { field: 'price', headerName: 'Price',type: 'number', width: 180, headerAlign:'center', align:'center' },
    { field: 'high', headerName: 'High', type: 'number',width: 180, headerAlign:'center', align:'center'  },
    { field: 'low', headerName: 'Low',type: 'number', width: 180, headerAlign:'center', align:'center' },
    { field: 'volume', headerName: 'Volume',type: 'number', width: 180, headerAlign:'center', align:'center' },
    {
      field: "Remove",
      sortable: false,
      filterable: false,
      renderCell : (cellValues) => {
        return (
          <Button variant="outlined" 
          startIcon={<DeleteIcon style={{position:'relative', left:'40%'}}/>}
          color="primary"
          sx= {{pr:3, pl:3, w:'auto'}}
          onClick={(event) =>{
            console.log("cell values", cellValues)
            
            Swal.fire({
              title: 'Are you sure?',
              text: `Remove ${cellValues.row.symbol} from watchlist`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, remove it!',
              background:'#111726',
              color:'white',
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(event, cellValues.row.id, cellValues.row.symbol);
              }
            })
          }}
          
          >
          </Button>
        );
      },
      headerAlign: 'center',
      align: 'center',
      width: 150
    }
  ];
  
  // const row_data= data.map((item, index) => {
  //   return (
  //     <tr key={index}>
  //       <td>{item}</td>
  //       <td><button onClick={e => handleDelete(index,e)}>Delete</button></td>
  //     </tr>
  //   )
  // })
  return (
    
    <div>
      <HeaderTwo/>

      { data?.length <= 0 
      ? 
      <div >
      <h1 align='center' style={{ color:'white', left:'50%', size:'50px',marginTop:"20%"}}>No items to display in your watchlist</h1>
      </div>
      :
      loader ? 
        <Loader/>
      : 
      <div >
        <Container maxWidth="lg">
        <div style={{ height: 400, width: '100%'}}>
          <DataGrid
            rows={
            rows
            }
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            sx={{
              m:2,
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              color: 'white',
              backgroundColor: '#393C45'
            }
          }
        />
        </div>
        </Container>
      </div>}
    </div>
  )
}

