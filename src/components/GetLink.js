import React, { useState } from 'react'
import { TbShieldLock } from 'react-icons/tb'
import DesktopModal from './DesktopModal'
import MobileModal from './MobileModal'
import useWindowSize from './UseWindowSize'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '@/redux/reducers/bottomSheet'
import { setUrl } from '@/redux/reducers/getUrl'


const GetLink = () => {
    const [newUrl, setNewUrl] = useState('')

    // getting value form redux
    const isToggled = useSelector((state) => state.bottomSheet);

    const dispatch = useDispatch();

    // checking screen ratio
    const { isMobile, isDesktop } = useWindowSize();

    const handleBottomSheet = async (e) => {
        dispatch(toggle())
        dispatch(setUrl(newUrl))
    }
    const setChange = (event) => {
        setNewUrl(event.target.value);
    }

    return (
        <>
            <div className="font-secondary flex flex-shrink w-full px-2 max-w-lg mx-auto justify-center" >
                <input
                    className="border border-r-0 border-palette-light rounded-l-lg w-2/3 focus:outline-none focus:ring-1 px-4 focus:ring-palette-primary"
                    type="url"
                    placeholder="https://example.com"
                    onChange={setChange}
                    required
                    pattern="https?://.+"
                    title="Please enter a valid URL starting with https://"
                />

                <button
                    onClick={handleBottomSheet}
                    type="submit"
                    className={"py-3 px-4 bg-black hover:bg-palette-dark text-white text-sm sm:text-base font-semibold rounded-r-lg border border-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary"}
                >
                    <TbShieldLock className="sm:hidden flex text-2xl" />
                    <span className="hidden sm:flex">Secure Link</span>
                </button>
            </div>


            <div >
                {isMobile && <MobileModal openModal={isToggled} />}
                {isToggled && (isDesktop &&
                    <div className='fixed inset-0 flex justify-center items-center top-0 left-0 backdrop-blur-lg z-50'><DesktopModal />
                    </div>
                )}
            </div>

        </>
    )
}

export default GetLink