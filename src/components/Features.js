import React from 'react'
import { BiEdit, BiLock } from 'react-icons/bi'
import { AiOutlineEyeInvisible, AiOutlineCloudServer, AiOutlineFieldTime } from 'react-icons/ai'
import { HiCursorClick } from 'react-icons/hi'

const Features = () => {
    return (
        <div className='max-w-6xl  mx-auto px-8 sm:px-4 grid gap-3 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            <div className="rounded-2xl border border-zinc-500 shadow-xl" >
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div>
                        <h3 className="font-medium text-white ">
                            <BiEdit size={35} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Customize your short links according to your preferences.
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-zinc-500 shadow-xl">
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div >
                        <h3 className="font-medium text-white ">
                            <BiLock size={35} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Protect your links with a password to keep them secure.
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-zinc-500 shadow-xl">
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div >
                        <h3 className="font-medium text-white ">
                            <AiOutlineEyeInvisible size={35} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Delete the link automatically after a single view to enhance security.
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-zinc-500 shadow-xl">
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div >
                        <h3 className="font-medium text-white ">
                            <HiCursorClick size={32} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Limit the number of clicks on your link for added security.
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-zinc-500 shadow-xl">
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div >
                        <h3 className="font-medium text-white ">
                            <AiOutlineFieldTime size={35} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Set an expiration time for your links, after which they will become inactive.
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-zinc-500 shadow-xl">
                <div className="block rounded-2xl  p-4 sm:p-6 lg:p-8" >
                    <div >
                        <h3 className="font-medium text-white ">
                            <AiOutlineCloudServer size={36} />
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Encrypt your destination link before saving it to the server for enhanced privacy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features