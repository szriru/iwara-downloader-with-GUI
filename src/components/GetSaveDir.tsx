import React, { useState } from 'react'

const GetSaveDir: Promise<Void> = ({ dirRef }) => {
  const [saveDir, setSaveDir] = useState('')


  const handleClick = async () => {
    console.log("start handleClick:reqSaveDir ==>")
    const temp = await window.dlApi.reqSaveDir()
      .catch(err => { throw err})
    setSaveDir(temp)
    console.log("==> end handleClick:reqSaveDir")
  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[90vw] border-2 border-slate-500 m-8 rounded-lg">
        <h3 className="text-2xl text-white">Save Location</h3>
        <div className="inline-flex justify-center items-center">
          <input ref={dirRef} className="m-2 p-2 rounded-lg focus:outline-none hover pointer-events-none" readOnly value={saveDir} />
          <button className="m-2 p-2 rounded-lg hover:border-sky-400 bg-slate-100 border-sky-200 border-2" onClick={handleClick}>
              Choose Save Location
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetSaveDir