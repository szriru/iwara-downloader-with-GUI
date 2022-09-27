import React, { useState, useRef } from 'react';
import AppBar from './components/AppBar';
import GetSaveDir from './components/GetSaveDir';
import VideoPageUrlList from './components/VideoPageUrlList';

import isDEV from './helpers/isDEV';

function App() {

  const [allVideoPageUrls, setAllVideoPageUrls] = useState<string[] | []>([])
  const [gotUrl, setGotUrl] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const urlRef = useRef<HTMLInputElement | null>(null)
  const dirRef = useRef<HTMLInputElement | null>()

  const handleSubmit: Promise<Void> = async (e: any) => {
    e.preventDefault()
    console.log("start handleSubmit:getAllVideoPageUrls ==>")
    setIsLoading(true);

    const temp = await window.dlApi.getAllVideoPageUrls(urlRef.current.value)
      .catch(err => { throw err })

    setAllVideoPageUrls(temp)
    setGotUrl(true)
    setIsLoading(false)
    console.log("==> end handleSubmit:getAllVideoPageUrls")
  }

  const checkStates = () => {
    console.table({gotUrl,isLoading})
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex justify-center items-center mt-6">
        <div className="max-h-[100px] w-[90vw] border-2 border-slate-500 rounded-lg">
          <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <input
              type="url"
              placeholder="Enter userpage url and hit the GET button"
              className="p-2 m-2 w-[70%] rounded-lg bg-slate-100"
              ref={urlRef}
            />
            <button
              type="submit"
              className="bg-sky-200 w-auto hover:bg-sky-400 p-2 m-2 rounded-lg"
            >
              GET
            </button>
          </form>
        </div>
      </div>
      {isDEV() ? <button onClick={checkStates}>check saveStates</button> : null}
      <GetSaveDir dirRef={dirRef} />
      <VideoPageUrlList gotUrl={gotUrl} isLoading={isLoading} allVideoPageUrls={allVideoPageUrls} dirRef={dirRef} />
    </div>
  );
}

export default App;
