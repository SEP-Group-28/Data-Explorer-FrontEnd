import React from "react";
import "./App.css";
import Router from "./navigation/Router";
import { gapi } from "gapi-script";
import {useEffect,useState} from 'react';
import { onMessageListener } from "./firebaseInit";
import ReactNotificationComponent from "./views/notification/ReactNotifications";
import TokenRequest from "./views/notification/TokenRequest";
// import { onMessageListener } from "./utils/firebaseInit";
import {useEffect, useState} from 'react';
import {onMessageListener} from "./firebaseInit"

const client_id = "1061743313688-iokgsqk1gm07khha74tq9evt4k798ucf.apps.googleusercontent.com"

function App() {
  const [show,setShow] =useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' })

  onMessageListener()
    .then(payload => {
      setShow(true)
      // toast.success(`${payload.notification.body}`)
      setNotification({
        // title: 'New notification',
        title: payload.notification.title,
        body: payload.notification.body
      })
      console.log(payload.notification)
    })
    .catch(err => console.log('failed: ', err))

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
      {show &&(
        <ReactNotificationComponent
        title={notification.title}
        body={notification.body}
        />
      )}
      <TokenRequest/>
    </div>
  );
}

export default App;
