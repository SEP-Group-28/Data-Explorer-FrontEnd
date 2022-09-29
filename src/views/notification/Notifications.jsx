import React, { useState, useEffect } from "react";
import "../../assets/css/Notifications.css"
import DummyData from "./notificationDummyData.json"
import { autocompleteClasses, Container } from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete'

const rows = DummyData;

export default function Notifications(){
    const [data, setData] = useState(rows);
    const handleDelete = (e, id) => {
        setData(data.filter(elem=> elem.id !== id));
    }
    const columns = [
        { field:'id', hide:true},
        { field: 'symbol', headerName: 'Symbol', width: 100, headerAlign:'center', align:'center', sortable:false },
        { field: 'message', headerName: 'Message', width: 200, headerAlign:'center', align:'center', sortable:false },
        { field: 'open price', headerName: 'Open Price',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        { field: 'current peak', headerName: 'Current Peak',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
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
          width: 120
        }
    ];
    return (
        data.length <= 0 
        ? 
        <div >
        <h1 align='center' style={{ color:'black', left:'50%', size:'50px',marginTop:"20%"}}>No new notifications</h1>
        </div>
        : 
        <div >
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
