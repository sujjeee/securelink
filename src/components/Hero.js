import React from 'react'
import Link from 'next/link';
import { ImTwitter } from 'react-icons/im';

const Hero = () => {
    return (
        <div className='flex flex-1 w-full flex-col items-center justify-center text-center px-4  mt-10 background-gradient sm:py-16 py-9' >
            <div className="mb-12 flex sm:justify-center">
                <Link
                    href="https://twitter.com/sujjeeee"
                    className="text-zinc-400 relative overflow-hidden rounded-lg py-1.5 px-6 text-sm leading-6 ring-1 ring-zinc-100/10 hover:ring-zinc-100/30 tracking-wide duration-150 flex items-center gap-2"
                >
                    <ImTwitter /> Introducing SecureLink
                </Link>
            </div>
            <h1 className="mx-auto max-w-6xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-6xl  text-[45px]  text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white leading-[48px] sm:leading-none">
                Securely Share Your Links with  <span className='block sm:mt-1.5'>Custom Access Controls</span>

            </h1>
            <h2 className="mx-auto mt-12 max-w-[320px] sm:max-w-2xl text-base sm:text-lg sm:text-gray-400  text-gray-500 ">
                SecureLink is a link shortener that gives you full control over your links. You can set a password, a read count limit and a one-time open option for your links.
            </h2>
        </div >
    )
}

export default Hero