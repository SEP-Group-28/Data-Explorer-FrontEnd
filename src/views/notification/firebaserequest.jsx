import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { fetchToken } from '../../firebaseInit'
import { fetchToken} from './../../utils/firebaseInit';

const Notifications = props => {
  const [isTokenFound, setTokenFound] = useState(false)
  const [getFcmToken,setFcmToken]=useState("")
  // const dispatch = useDispatch()

  console.log('Token found', isTokenFound)

  // To load once
  useEffect(() => {
    let data

    async function tokenFunc () {
      data = await fetchToken(setTokenFound, setFcmToken)
      if (data) {
        console.log('Token is', data)
      }
      return data
    }

    tokenFunc()
  }, [setTokenFound])

  return <></>
}

Notifications.propTypes = {}

export default Notifications
