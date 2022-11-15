import React, { useState, useEffect } from "react";
import "../../assets/css/Notifications.css"
import DummyData from "./notificationDummyData.json"
import { autocompleteClasses, Container } from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationServices from "../../services/NotificationServices";
import { Fragment } from "react";
import Token from "../../services/Token";
import { useDispatch, useSelector } from "react-redux";
import { decrement, setCount } from "../../redux/notification";

// const rows = DummyData;

export default function Notifications(){
  // for no new notification alert
    const [open_, setOpen_] = useState(true);
    const handleOpen_ = () => setOpen_(true);
    // let {count} = useSelector(state => state.notification)
    const dispatch = useDispatch()
    const handleClose_ = (event, reason) => {
      if (reason == 'clickaway'){
        return;
      }
      setOpen_(false);
      return
    };
    const callHistoricNotifications = async() => {
      const rows = await NotificationServices.getNotifications();
      const rows_ = rows?.data['last day notifications'].map((row, index) => {
        return {
          id: index,
          date:  " " + new Date(row[0]).getDate() + "/" + new Date(row[0]).getMonth() + "/" + new Date(row[0]).getFullYear() + " " + new Date(row[0]).getHours() + ":" + new Date(row[0]).getMinutes() + ":" + new Date(row[0]).getSeconds(),
          symbol: row[1],
          price: row[2],
          type: 'crossing',
        }
      })
      console.log("rows", rows_)
      // console.log("rows", rows?.data['last day notifications'])
      setData(rows_)
      console.log("data  notifications:", rows)
      
    };
    useEffect(()=>{
      callHistoricNotifications();
      // let eventSource = new EventSource(
      //   `${config.DOMAIN_NAME}/notifications/present`,
      //   {headers: { Authorization: `Bearer ${Token.getAccessToken()}` }}
      // );
      // eventSource.addEventListener(
      //   "message",
      //   function (e) {
      //     let parsedData = JSON.parse(e.data);
      //     console.log("parsedData", parsedData)
      //     // let object = {
      //     //   time: parsedData[0],
            
      //     // };
      //     // candleSeries.current.update(object);
      //   }
      // );
    }, [])
    
    

    const action = (
      <Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose_}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Fragment>
    );

    const [data, setData] = useState([]);
    const handleMark = (e, id) => {
        dispatch(decrement())
        setData(data?.filter(elem=> elem.id !== id));
    }
    const columns = [
        { field:'id', hide:true},
        { field: 'date', headerName: 'Date', width: 175, headerAlign:'center', align:'center', sortable:true },
        { field: 'symbol', headerName: 'Symbol', width: 100, headerAlign:'center', align:'center', sortable:false },
        { field: 'price', headerName: 'Price',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        { field: 'type', headerName: 'Type', width: 200, headerAlign:'center', align:'center', sortable:false },
        
        // { field: 'current peak price', headerName: 'Current Peak',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        {
          field: "Mark As Read",
          sortable: false,
          filterable: false,
          renderCell : (cellValues) => {
            return (
              // <Button variant="outlined" 
              // startIcon={<DeleteIcon style={{position:'relative', left:'40%'}}/>}
              // color="primary"
              // sx= {{pr:3, pl:3, w:'auto'}}
              // onClick={(event) =>{
              //   handleDelete(event, cellValues.id);
              // }}
              //   Mark As Read
              // >
              // </Button>
              <Button variant="outlined" 
              startIcon={<CheckIcon style={{position:'relative', left:'40%'}}/>}
              color="primary"
              sx= {{pr:3, pl:3, w:'auto'}}
              onClick={(event) =>{
                handleMark(event, cellValues.id);
              }}
              >
              </Button>
            );
          },
          headerAlign: 'center',
          align: 'center',
          width: 120
        }
    ];
    return (
        
        data && data?.length <= 0
        ? 
          <Snackbar
            sx={{position:'absolute'}}
            open={open_}
            autoHideDuration={6000}
            onClose={handleClose_}
            message="No new notifications"
            action={action}
            anchorOrigin={{ vertical:'top',  horizontal:'center'}}
          />
        : 
        <div>
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
    );
}

// export default NotificationModal;
