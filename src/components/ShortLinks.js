import React from 'react'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineRise, AiOutlineLink } from 'react-icons/ai'
import useWindowSize from './UseWindowSize';
import { toast, Toaster } from 'react-hot-toast';

const ShortLinks = ({ shortedLinks }) => {
    const { isMobile, isDesktop } = useWindowSize();
    return (

        <div id="generated_links" className="flex rounded-md border border-gray-200 bg-white shadow-lg transition-[border-color] hover:border-black w-full ">
            <span className="flex items-center bg-gray-100 h-full rounded-l-md border-r px-3 sm:px-5 text-gray-500">
                <AiOutlineLink size={20} />
            </span>
            <div className="flex justify-between items-center">
                <div className="flex items-center p-3 sm:w-[350px] md:w-[500px] ">
                    <div>
                        <div className=" flex items-center">
                            <a className="font-semibold text-blue-800 w-[120px] md:max-w-[450px] sm:w-[500px] " href={shortedLinks.shortId} target="_blank" rel="noreferrer">
                                {isMobile && new URL(shortedLinks.shortId).pathname}
                                {isDesktop && (
                                    <>
                                        {new URL(shortedLinks.shortId).hostname}
                                        <span>{new URL(shortedLinks.shortId).pathname}</span>
                                    </>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 px-4 bg-white">
                    <div className=" flex gap-2 rounded bg-green-100 p-1.5 text-green-600">
                        <AiOutlineRise />
                        <div className="text-xs font-medium flex mr-1 sm:mr-0">
                            {shortedLinks.clicks ? shortedLinks.clicks : 0}
                            <span className="hidden sm:flex ml-1">
                                clicks
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            navigator.clipboard.writeText(shortedLinks.shortId)
                            toast.success("Copied shortlink to clipboard")
                        }}
                        className="flex gap-2" >
                        <MdContentCopy size={20} className="text-gray-500 hover:text-gray-800" />
                    </button>
                    <Toaster />
                </div>
            </div>
        </div>

    )
}

export default ShortLinks