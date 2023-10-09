import React, { useState, useRef } from "react";
import 'katex/dist/katex.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from '@mui/material/Slider'
import { AiOutlineFontSize } from 'react-icons/ai'

export default function Topic({ props, error }) {
    const [fontScale, setFontScale] = useState(100)
    const contentRef = useRef(null)
    const titleRef = useRef(null)
    const [fontChange, setFontChange] = useState(false)
    const data = props
    const topic = data?.data

    const doFontChange = () => {
        if (fontChange) setFontChange(false)
        else setFontChange(true)
    }

    const changeSize = (e) => {
        contentRef.current.style.setProperty('font-size', `${e.target.value}%`)
        titleRef.current.style.setProperty('font-size', `${e.target.value * 2}%`)
    }

    return (
        <div className={`z-10 relative lg:col-span-4 flex flex-col w-full h-fit p-5 pt-0 px-10 dark:bg-background`}>
            {!data && !error ?
                <div className={`relative w-full h-full flex flex-col gap-10`}>
                    <span className="place-self-center"><Skeleton width={180} height={20} baseColor='gray' /></span>
                    <div className='flex flex-col gap-1 mt-10'>
                        {[...Array(15)].map((val, i) =>
                            <div key={i} className='w-full mx-auto'><Skeleton baseColor="silver" height={18} /></div>
                        )}
                    </div>
                </div >
                :
                topic ?
                    <div className={`w-full h-full flex flex-col gap-10`}>
                        {fontChange ?
                            <span onClick={doFontChange} className={`hover:cursor-pointer w-[100px] text-lg flex items-center gap-5 fixed bottom-4 right-8`}>
                                <Slider
                                    defaultValue={fontScale}
                                    step={2}
                                    min={50}
                                    max={150}
                                    onChange={changeSize}
                                    aria-label="Default"
                                    valueLabelDisplay="auto" />
                                <div className="text-sm bg-blue-800 text-white rounded-md p-1 ">Ok</div>
                            </span>
                            :
                            <span onClick={doFontChange} className={`text-lg bg-blue-800 fixed bottom-4 right-8 text-white rounded-md w-fit p-1 cursor-pointer`}>
                                <AiOutlineFontSize className="cursor-pointer" />
                            </span>
                        }
                        <h1 ref={titleRef} className={`w-full text-4xl text-center break-words dark:text-mainText`}>
                            {topic?.title}
                        </h1>
                        <div ref={contentRef} dangerouslySetInnerHTML={{ __html: topic.content }} className={`dark:text-mainText text-[${fontScale}px] font-normal pt-5 w-full break-words min-h-fit h-full overflow-x-auto lg:px-5`}>
                        </div>
                    </div>
                    :
                    <div className="relative w-full h-full flex flex-col gap-10">
                        <div className="w-full text-center text-3xl font-semibold dark:text-mainText/90">
                            {topic?.title}
                        </div>
                        <div className="text-warningText w-full h-full flex items-center justify-center">
                            {data?.message}
                        </div>
                    </div>
            }
        </div >
    );
}