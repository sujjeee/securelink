import React from 'react'

const notFound = () => {
    return (
        <main className="flex justify-center items-center py-24 px-6 sm:py-32 lg:px-8 h-[70vh] sm:h-screen">
            <div className="text-center">
                <h1 className="mx-auto max-w-6xl font-display text-5xl font-bold tracking-wider text-gray-300 sm:text-6xl  text-[45px]  text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white leading-[48px] sm:leading-none">You are lost!</h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/" className="rounded-md bg-white px-7 py-4 text-base font-semibold text-black shadow-sm hover:bg-transparent hover:border hover:text-white  ">Go back home</a>
                </div>
            </div>
        </main>
    )
}

export default notFound