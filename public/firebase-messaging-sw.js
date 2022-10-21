// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.12.1/firebase-app-compat.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.12.1/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config


// eslint-disable-next-line no-undef
firebase.initializeApp( {
  apiKey: "AIzaSyAlhYcsvmpoxbCZ_GmR0E2Ibf4FhsE4-oQ",
  authDomain: "crypstoxplorer-8e0db.firebaseapp.com",
  projectId: "crypstoxplorer-8e0db",
  storageBucket: "crypstoxplorer-8e0db.appspot.com",
  messagingSenderId: "122369437189",
  appId: "1:122369437189:web:f058b71dd412d0baf3366c",
  measurementId: "G-0ZKZDG9WV9"
})

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  }

  // eslint-disable-next-line no-restricted-globals
  // self.ServiceWorkerRegistration.showNotification( notificationTitle,
  //   notificationOptions)
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
