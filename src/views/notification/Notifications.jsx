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

// const rows = DummyData;

export default function Notifications({increment}){
  // for no new notification alert
    const [open_, setOpen_] = useState(true);
    const handleOpen_ = () => setOpen_(true);
    const handleClose_ = (event, reason) => {
      if (reason == 'clickaway'){
        return;
      }
      setOpen_(false);
      return
    };
    const callHistoricNotifications = async() => {
      const rows = await NotificationServices.getNotifications();
      setData(rows?.data['last 5 days notifications'])
      console.log("data  notifications:", rows)
    };
    useEffect(()=>{
      callHistoricNotifications();
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
        increment();
        setData(data?.filter(elem=> elem.id !== id));
    }
    const columns = [
        { field:'id', hide:true},
        { field: 'symbol', headerName: 'Symbol', width: 100, headerAlign:'center', align:'center', sortable:false },
        { field: 'type', headerName: 'Message', width: 200, headerAlign:'center', align:'center', sortable:false },
        { field: 'open price', headerName: 'Open Price',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        { field: 'current peak price', headerName: 'Current Peak',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
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
            rows={data.map((row)=>row[1])}
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
