import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ReactNotificationComponent = ({ title, body }) => {
  let hideNotif = title === ''

  if (!hideNotif) {
    toast.info(<Display/>)
  }

  function Display () {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    )
  }

  return (
    <ToastContainer
      autoClose={2500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      bodyClassName='toastBody'
      toastStyle={{ backgroundColor: '#111726', color: 'white' }}
    />
  )
}

ReactNotificationComponent.defaultProps = {
  title: 'This is title',
  body: 'Some body'
}

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

export default ReactNotificationComponent
