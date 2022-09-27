import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="Loader">
      <Audio
        height="70"
        width="70"
        color="#286AEF"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        
      />
    </div>
  );
}

export default Loader

