import React from "react";
import "./App.css";
import Router from "./navigation/Router";
import { gapi } from "gapi-script";
import {useEffect} from 'react';

const client_id = "1061743313688-iokgsqk1gm07khha74tq9evt4k798ucf.apps.googleusercontent.com"

function App() {
  
  useEffect(()=> {
    function start() {
      gapi.auth2.init({
        client_id: client_id,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })

  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
