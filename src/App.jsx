import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  useEffect(()=>{
    fetch("/members").then(
   
      res=>{res.json()
      console.log(res.json())}
      ).then(
        data =>{
          setData(data)
          console.log(data)
        }

    )
  },[])

  return (
    <div className="App">
     
    </div>
  )
}

export default App
