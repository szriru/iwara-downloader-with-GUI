import React from 'react'

const ProgressBar = ({ progress }) => {

    return (
      <div
        className={"h-full bg-pink-300"} 
        style={{width: progress?.toString() + "%"}}
      ></div>
    );
  };

export default ProgressBar