import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from 'react-loader-spinner';

function Loader({position,top,left}) {
  return (
    <div className="Loader" style={{position:position,top:top,left:left} }>
      <Audio
        height="60"
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

