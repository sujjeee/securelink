import React, { useState } from 'react'
import { RxShuffle } from 'react-icons/rx'
import { AiOutlineLink, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/reducers/bottomSheet';
import { addLink } from '@/redux/reducers/localStorage';
import shortid from 'shortid';
import { toast, Toaster } from 'react-hot-toast';
import useWindowSize from './UseWindowSize';

const SecurityForm = () => {
    const userUrl = useSelector(state => state.getUrl);
    const dispatch = useDispatch();

    const { isMobile } = useWindowSize();
    const [showPassword, setShowPassword] = useState(false)
    const [showLoader, setShowLoader] = useState(false)

    const [urlData, setUrlData] = useState({
        originalUrl: userUrl,
        shortId: "",
        protection: false,
        password: "",
        viewOnce: false,
        readCount: 50,
        expiresAt: 5
    })
    const { originalUrl, shortId, protection, password, viewOnce, readCount, expiresAt } = urlData
    const setChanges = (e) => {
        const { name, value, checked } = e.target;
        if (name === "protection" || name === "viewOnce") {
            setUrlData({
                ...urlData,
                [name]: checked,
                password: checked ? password : null
            });
        } else {
            setUrlData({
                ...urlData,
                [name]: value
            });
        }
    }


    const genRandom = () => {
        setUrlData(prevUrlData => {
            return {
                ...prevUrlData,
                shortId: shortid.generate()
            }
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (protection && !password) {
            alert('Please enter a password for the protected URL.');
            return;
        }

        try {
            setShowLoader(true);
            const res = await axios.post('/api/create-shortlink', { originalUrl, shortId, protection, password, viewOnce, readCount, expiresAt });

            if (res) {
                setTimeout(() => {
                    setShowLoader(false);
                    dispatch(toggle())
                    window.scrollTo({
                        top: document.getElementById('generated_links').offsetTop - 200,
                        behavior: 'smooth'
                    });

                    toast.success("Link generated successfully");
                    const link = { shortId: res.data.shortUrl, expiresAt: res.data.expiresAt };
                    dispatch(addLink(link));

                    // Get the existing links array from the local storage
                    const existingLinks = JSON.parse(localStorage.getItem("secure-links")) || [];

                    // Add the new link to the array
                    existingLinks.push(link);

                    // Store the updated array in the local storage
                    localStorage.setItem("secure-links", JSON.stringify(existingLinks));

                }, 2000);
            }
        } catch (error) {
            console.error(error)
            setShowLoader(false)
            toast.error("Invalid entry")
        }

    };
    return (
        <div>
            <form onSubmit={handleFormSubmit} >

                <div id="pop-up" className='overflow-scroll h-[400px] grid gap-6 bg-gray-50 py-6 pb-0 px-6 rounded-b-lg'>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Destination URL
                            </label>
                        </div>
                        <div className=" mt-1 flex rounded-md shadow-sm">
                            <input
                                name="originalUrl"
                                type="url"
                                value={originalUrl}
                                onChange={setChanges}
                                placeholder="https://github.com/steven-tey/dub"
                                className="border border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md text-sm focus:outline-none p-2.5"
                                required
                                pattern="https://.+"
                                title="Please enter a valid URL starting with https://"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Short Link</label>
                            <button
                                type="button"
                                className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                                onClick={genRandom}>
                                <RxShuffle size={15} />
                                <p>Randomize</p>
                            </button>
                        </div>
                        <div className="relative mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 py-2.5 text-sm text-gray-500">
                                <AiOutlineLink size={20} />
                            </span>
                            <input
                                type="text"
                                name="shortId"
                                value={shortId}
                                onChange={setChanges}
                                pattern="^(?=.*[a-zA-Z])([\w -]*[a-zA-Z0-9])?$"
                                className="border border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-r-md pr-10 text-sm focus:outline-none p-2.5"
                                placeholder="github"
                                title="Please enter a valid URL name "
                                required />
                        </div>
                    </div>
                    <div className="relative py-5">
                        <div className="absolute inset-0 flex items-center px-4" >
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-gray-50 px-2 text-sm text-gray-500">Optional</span>
                        </div>
                    </div>
                    <div className="border-b border-gray-200 pb-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-900">Password Protection</h2>
                            <label htmlFor="open" className="relative h-4 w-8 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    id="open"
                                    name="protection"
                                    checked={protection}
                                    onChange={setChanges}
                                    className="peer sr-only"
                                />
                                <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                                <span
                                    className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-white transition peer-checked:translate-x-4 mx-0.5"
                                ></span>
                            </label>
                        </div>
                        {protection &&
                            <div className="relative mt-3 rounded-md shadow-sm"  >
                                <input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 p-2.5 border"
                                    placeholder="Enter password"
                                    onChange={setChanges}
                                // value={password}
                                />
                                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <AiOutlineEye className="text-xl text-gray-400" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="text-xl text-gray-400" />
                                    )}
                                </button>
                            </div>
                        }
                    </div>
                    <div className="border-b border-gray-200 pb-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-900">View only once</h2>
                            <label htmlFor="viewOnce" className="relative h-4 w-8 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    id="viewOnce"
                                    name="viewOnce"
                                    checked={viewOnce}
                                    onChange={setChanges}
                                    className="peer sr-only"
                                // required
                                />
                                <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                                <span
                                    className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-white transition peer-checked:translate-x-4 mx-0.5"
                                ></span>
                            </label>
                        </div>
                    </div>
                    <div className="border-b border-gray-200 pb-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-900">Read Count</h2>
                        </div>
                        <div className="relative mt-3 rounded-md shadow-sm"  >
                            <input
                                name="readCount"
                                id="readCount"
                                type="number"
                                className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 p-2.5 border"
                                value={readCount}
                                onChange={setChanges}
                                min="1"
                                max="100"
                            />
                        </div>
                    </div>
                    <div className="pb-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-900">Expires in (minutes)</h2>
                        </div>
                        <div className="relative mt-3 rounded-md shadow-sm">
                            <input
                                name="expiresAt"
                                id="expiresAt"
                                type="number"
                                className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 p-2.5 border"
                                value={expiresAt}
                                onChange={setChanges}
                                min="1"
                                max="30"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-lg bg-gray-100 font-medium text-center py-5 px-4 border-t border-gray-300">
                    <button
                        type="submit"
                        className={`border-black bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none ${showLoader ? "cursor-not-allowed disabled:opacity-90 " : "cursor-pointer"}`}
                        disabled={showLoader}
                    >
                        {showLoader ?
                            <>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#ffffff" />
                                </svg>

                                Generating...
                            </>
                            : <p className="text-sm">Generate link</p>
                        }
                    </button>
                    {isMobile && <Toaster />}
                </div>
            </form>
        </div>
    )
}

export default SecurityForm