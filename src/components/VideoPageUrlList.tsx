import React, {useEffect, useState, useRef, createRef} from 'react'
import ProgressBar from './ProgressBar';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from '@mui/icons-material/Download';

import isDEV from '../helpers/isDEV';

interface IProps {
    gotUrl: bool,
    isLoading: bool,
    allVideoPageUrls: string[],
    dirRef?: HTMLInputElement,
}

const VideoPageUrlList = ({ gotUrl, isLoading, allVideoPageUrls, dirRef }: IProps) => {
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const [dlProgresses, setDlProgresses] = useState<number[] | []>([])
    const [quality, setQuality] = useState<string>("Source")
    const progressBarRefs = useRef<Array<HTMLDivElement> | []>([])

    useEffect(( ) => {
        setDlProgresses(new Array(allVideoPageUrls.length).fill(0))
    }, [allVideoPageUrls])
    
  
    const handleDownload: Promise<Void> = async (e, idx, videoPageUrl) => {
        console.log("start handleDownload: isSaveDirSet + sendVideoPageUrl + getDlProgress ==>")
        console.log({e, idx, videoPageUrl})

        const isSaveDirSet = await window.dlApi.isSaveDirSet(dirRef.current.value)
        if(!isSaveDirSet){throw new Error("Set save location.")}
        if(isDownloading){throw new Error("Stll Downloading other file.")}

        setIsDownloading(true)

        progressBarRefs.current[idx].current.classList.remove('hidden')
        e.target.innerHTML = "Downloading..."

        window.dlApi.receiveDlProgress((_, _dlProgress) => {
            console.log(_dlProgress)
            if (_dlProgress >= 100) {
                window.dlApi.removeDlProgressListener()
                progressBarRefs.current[idx].current.classList.remove('animate-pulse')
                e.target.innerHTML = 'Complete.'
                setIsDownloading(false)
            }

            setDlProgresses(
                (prevs: []) => {
                    return [
                    ...prevs.slice(0, idx),
                    _dlProgress,
                    ...prevs.slice(idx + 1)
                    ]
                }
            )
        })

        const dlStatus = await window.dlApi.executeDlVideo(videoPageUrl, quality, dirRef.current.value)

        console.log({dlStatus})
        console.log("==> end handleDownload: isSaveDirSet + sendVideoPageUrl + getDlProgress")

    }

    const handleSelectChange = (e) => {
        setQuality(e.target.value)
    }

    const checkStates = (_) => {
        console.table({ isDownloading,quality})
    }

    return (
        <div className="m-2 min-h-[200px] flex flex-col items-center bg-gray-900 m-1">
            {isDEV() ? <button className="text-white" onClick={checkStates}>CHECK videoList states</button> : null}
            <div className="block  m-2 p-2 border-2 border-slate-500 rounded-lg w-[90vw]">
                <FormControl fullWidth className="inline-flex justify-center items-center">
                    <h3 className="text-white text-xl">Video Quality: </h3>
                    <Select
                        className="w-[50%] h-[40px] max-h-[60px] min-h-[40px]  mb-4 mx-10 bg-slate-100"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue="Source"
                        label="Quality"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"Source"}>Source</MenuItem>
                        <MenuItem value={"520p"}>520p</MenuItem>
                        <MenuItem value={"360p"}>360p</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="overflow-hidden flex flex-col justify-center items-center border-2 border-slate-500 m-2 rounded-lg w-[90vw]">
                <h3 className="text-white text-2xl mb-4 mt-1">video page urls</h3>
                <ul className="overflow-y-scroll scrollbar scrollbar-thumb-sky-300 scrollbar-track-sky-100 scrollbar-thin border-2 border-slate-800 m-2 rounded-lg bg-slate-500 w-[85vw] min-h-[30vh] ">
                    {
                        (() => {
                            if(!gotUrl){
                                if(isLoading){
                                    return (
                                        <div className="inline-flex">
                                            <div className="absolute top-[50%] mr-[44px] mb-[44px] left-[50%]">
                                                <CircularProgress />
                                                <h3>Fetching Data...</h3>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="h-[100%] flex items-center justify-center">
                                        <h2 className="text-white text-center align- underline">
                                            <strong>PASTE</strong> an user page link & Hit the GET button <br/>
                                            <KeyboardDoubleArrowDownIcon /><br/>
                                            <strong>SELECT</strong> video quality <br/>
                                            <KeyboardDoubleArrowDownIcon /><br/>
                                            <strong>CLICK</strong> download button <br/>
                                            Only 1 video you can download at the same time
                                        </h2>
                                    </div>
                                )
                            }
                        })()
                    }
                    <div className="">
                    {(gotUrl && allVideoPageUrls) && (
                    allVideoPageUrls.map((videoPageUrl, idx) => {
                        progressBarRefs.current[idx] = createRef();
                        
                        return (
                            <li key={idx} className="block rounded-lg text-white border-sky-100 border-2 p-1 px-2 m-1 mx-3">
                                <div className="flex relative justify-center items-center">
                                    <div ref={progressBarRefs.current[idx]} className="z-0 absolute h-full w-full rounded-xl overflow-hidden hidden animate-pulse">
                                        <ProgressBar key={`progressBar-${idx}`} progress={dlProgresses[idx]}/>
                                    </div>

                                    <div className="z-10">
                                        <span>{idx}.</span>
                                        <span className="ml-2">{videoPageUrl}</span>
                                        <button className="bg-sky-100/[0] border-sky-200 border-2 p-2 m-2 ml-4 rounded-lg hover:border-sky-400" onClick={(e) => handleDownload(e, idx, videoPageUrl)}>
                                            Download <DownloadIcon />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )   
                    })
                    )}
                    </div>
                </ul>
            </div>    
        </div>
  )
}

export default VideoPageUrlList