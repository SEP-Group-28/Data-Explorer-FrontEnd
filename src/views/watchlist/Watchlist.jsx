import React, { Component } from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import '../../assets/css/watchlist.css'
import { autocompleteClasses, Container } from '@mui/material';


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

const rows = [
  { id: 1, symbol: 'BTCUSD', price: 4343, high: 5554, low: 3544, volume: 456024 },
  { id: 2, symbol: 'BTCUSD', price: 4344, high: 5554, low: 3544, volume: 456024 },
  { id: 3, symbol: 'BTCUD', price: 4344, high: 5554, low: 3544, volume: 456024 },
  { id: 4, symbol: 'BTCSD', price: 43435, high: 5554, low: 3544, volume: 456024 },
  { id: 5, symbol: 'BTCUSD', price: 43432, high: 5554, low: 3544, volume: 456024 },
  { id: 6, symbol: 'BTCUSD', price: 43431, high: 5554, low: 3544, volume: 456024 },
  { id: 7, symbol: 'BTCUSD', price: 434322, high: 5554, low: 3544, volume: 456024 },
  { id: 8, symbol: 'BTCSD', price: 43431, high: 5554, low: 3544, volume: 456024 },
  { id: 9, symbol: 'BTCUSD', price: 4343, high: 5554, low: 3544, volume: 456024 }
]
export default function Watchlist() {
  

  const [data, setData] = useState(rows);
  const handleDelete = (e, id) => {
    setData(data.filter(elem=> elem.id !== id));
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
            handleDelete(event, cellValues.id);
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
    data.length <= 0 
    ? 
    <div >
    < HeaderTwo /> 
    <h1 align='center' style={{ color:'white', left:'50%', size:'50px',marginTop:"20%"}}>No items to display in your watchlist</h1>
    </div>
    : 
    <div >
    < HeaderTwo />
    <Container maxWidth="lg">
    <div style={{ height: 400, width: '100%'}}>
      
      <DataGrid
        rows={data}
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
    </div>
  )
}

