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
import PageLoader from '../../components/pageLoader/PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { removeMarketList, saveWatchlist } from '../../redux/watchlist';

export default function Watchlist() {
  
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [eventSources, setEventSources] = useState([])
  const [records, setRecords] = useState(new Map())
  const [removed, setRemoved] = useState(false)
  // const [removeMarket, setRemoveMarket] = useState([])
  let {removeMarket} = useSelector(state => state.watchlist)
  // console.log("Remove market, eliye", removeMarket)
  const dispatch = useDispatch()

  const handleDelete = async(e, id, symbol) => {
    
    setRemoved(true)
    // console.log("handle delete ", symbol)
    // const response = await WatchlistServices.removeMarket(symbol)
    // console.log("response :", response)
    // console.log("records before .....", records)
    let record_ = records
    // console.log("records before", record_)
    if (record_.delete(symbol)){
      dispatch(saveWatchlist(symbol))
    }
    setRecords(record_)
    // console.log("records", record_)
    setformat()

    
    
    // getWatchlist()
    let data_ = data
    data_ = data_.filter((item, index) => {
      return item !== symbol
    })
    console.log("data", data_)
    setRemoved(true)
    setData(data_)
    // const refreshTable = async() => {
    //   console.log("after delete",rows)
    //   let record_ = records
    //   record_.delete(symbol)
    //   console.log("table records", record_)
    //   setRemoved(true)
    //   setRecords(record_)
    // }
    console.log("hee heee")
    // console.log("rows :", rows)
    // await refreshTable();
    // console.log("after delete",records)
    // if (response.status === 200) {
    //   Swal.fire({
    //     title: `${symbol}`,
    //     text: 'Removed from watchlist successfully',
    //     icon: 'success',
    //     background:'#111726',
    //     showConfirmButton: false,
    //     color:'white',
    //     timer: 1500,
    //   })
    //   setTimeout(() => {
    //     setLoader(false)
    //   }, 1500);
      
    // }
    // else{
    //   Swal.fire({
    //     title: `Error removing ${symbol} from watchlist`,
    //     text: response.data.message,
    //     icon: 'error',
    //     confirmButtonText: 'Ok',
    //     background:'#111726',
    //     color:'white',
    //   })
    // }
    setRemoved(false)
  }
  
  const [itemArr, setItemArr] = useState([])
  const userDecode = Token.getAuth()
  const user_id = userDecode['user_id']
  const [loading, setLoading] = React.useState(true);

  const checkMarket = async() => {
    console.log("remove use effect", removeMarket)
    if (removeMarket.length > 0){
      console.log("remove use.....")
      console.log("remove market", removeMarket)
      const response = await WatchlistServices.removeMarket(removeMarket)
      console.log("response :", response)
      dispatch(removeMarketList())
    }
  };
  useEffect(()=>{
    checkMarket()
    console.log("calling.........")
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    getWatchlist()

  }, []);
  const getWatchlist = async() => {
    //     console.log("response :", response) 
    const response = await WatchlistServices.viewWatchlist()
    console.log("response get watchlist:", response)
    const data_ = response.data.data
    // console.log("data of list", data_)
    if (data_==null)
      setData([])
    else
      setData(data_)
  };

  useEffect(()=>{
    console.log(removed)
    if(removed){return}
    let watcheventSource = null
    if (data !== null) {
      console.log("data in event source", data)
      for (let i in data) {
          watcheventSource  = new EventSource( "http://127.0.0.1:5000/present/" + data[i].split('/')[0] + '/1m')
          watcheventSource.addEventListener(
            'message',
            function(e){
              let parsedData = JSON.parse(e.data)
              let object = {
                id: i,
                symbol: data[i],
                price: parseFloat(parsedData[4]).toFixed(4),
                high: parseFloat(parsedData[3]).toFixed(4),
                low: parseFloat(parsedData[2]).toFixed(4),
                volume: parseFloat(parsedData[5]).toFixed(4)
              }
              records.set(data[i], object)
              setRecords(records)
              setformat()
            }
          )
          eventSources.push(watcheventSource)
          setEventSources(eventSources)

      }
      
    }

    return async() => {
      if (eventSources.length !== 0) {
        for (let eventsource of eventSources) {
          eventsource.close()
        }
        setEventSources([])
      }
    }

  },[data])

  // useEffect(()=>{
  //     const response = WatchlistServices.removeMarket(removeMarket)
  //     console.log("response :", response) 
  // },[removeMarket])

  const setformat=()=>{
    const rows=[]
    const ids = []
    for (let [key, value] of records){
      if (ids.includes(value.id)) continue
      ids.push(value.id)
      rows.push(value)
    }
    // console.log("rows", rows)
    setRows(rows)
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
  
  return (
    <div>
    {loading
    ? 
      <PageLoader/>
    :
    <div>
      <HeaderTwo/>

      { rows?.length <= 0 
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
          {/* {console.log("rows for the data grid", rows)} */}
          <DataGrid
            rows={
            rows
            }
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
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
    </div>}
    </div>
  )
}

