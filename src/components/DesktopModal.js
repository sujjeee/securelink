import React, { useState } from 'react'
import SecurityForm from './SecurityForm'

const DesktopModal = () => {
    return (
        <div className='absolute'>
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <div className="flex flex-col items-center bg-gray-100 rounded-lg relative border-2 border-gray-200 font-faber  w-[350px]">
                        <div className="grid w-full">
                            <h3 className="text-lg font-extrabold tracking-wide text-center py-5 border-b border-gray-200">
                                Secure Your Link!
                            </h3>
                            <SecurityForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopModal