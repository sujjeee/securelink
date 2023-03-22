import Link from 'next/link'
import React from 'react'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { TbShieldLock } from 'react-icons/tb'

const Navbar = () => {

    return (
        <nav className="flex px-4 items-center max-w-6xl mx-auto justify-between py-2 sm:py-4 relative text-white">
            <div className="md:py-2 py-1 cursor-pointer text-xl sm:text-3xl  font-bold tracking-wider text-white ">
                <Link href="/" className='flex items-center justify-center gap-1.5 sm:gap-3'>
                    <TbShieldLock className='text-2xl sm:text-4xl' />
                    SecureLink
                </Link>
            </div>
            <div className='flex font-semibold  tracking-wide items-center gap-5'>
                <div className='sm:hidden flex gap-3'>
                    <Link
                        href="https://twitter.com/sujjeeee"
                        target="_blank">
                        <AiOutlineTwitter size={25} />
                    </Link>
                    <Link
                        href="https://github.com/sujjeee/securelink"
                        target="_blank">
                        <AiFillGithub size={25} />
                    </Link>
                </div>
                <div className="hidden sm:flex mx-auto  max-w-fit ">

                    <a
                        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-2 px-5 shadow-lg transition-all  text-black"
                        href="https://github.com/sujjeee/securelink"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <AiFillGithub size={20} />
                        <p className="text-sm">Star on GitHub</p>
                    </a>
                </div>

            </div>
        </nav>
    )
}

export default Navbar