import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Features from '@/components/Features';
import GetLink from '@/components/GetLink';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ShortLinks from '@/components/ShortLinks';
import Head from 'next/head';

const Home = () => {
    const [urls, setUrls] = useState([]);
    const [filterUrls, setFilterUrls] = useState([])
    const localUrl = useSelector(state => state.localStorage);

    const gitUrl = {
        shortId: "https://securelink.vercel.app/github"
    }

    const fetchData = async (urls) => {
        try {
            const updatedUrls = await Promise.all(
                urls.map(async (url) => {
                    const response = await fetch(`/api/getclicks?link=${url.shortId}`);
                    const data = await response.json();
                    return { ...url, clicks: data.clicksCounts };
                })
            );
            setUrls(updatedUrls);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            const genratedUrls = JSON.parse(localStorage.getItem("secure-links"));
            if (genratedUrls) {
                const currentTime = new Date().getTime();
                const filteredUrls = genratedUrls.filter(
                    (link) => new Date(link.expiresAt).getTime() > currentTime
                );
                localStorage.setItem("secure-links", JSON.stringify(filteredUrls));
                setFilterUrls(filteredUrls);
            }
        } catch (error) {
            console.log(error);
        }
    }, [localUrl]);

    useEffect(() => {
        if (filterUrls.length > 0) {
            fetchData(filterUrls);
        }
    }, [filterUrls]);

    return (
        <>
            <Head>
                <title>SecureLinks</title>
                <meta name="google-site-verification" content="5z2lDnQ6mdG9S2qZm74DNfOk3xdwLR-orzDHc5XiJxs" />
            </Head>
            <div>
                <header className='border-b border-[#333333] sticky top-0  backdrop-blur-3xl z-50'>
                    <Navbar />
                </header>
                <Hero />
                <GetLink />
                <div className='pb-28 py-24 sm:py-40 sm:pb-0 px-4' >
                    <div className="mx-auto text-center py-9 sm:py-16 max-w-[320px] sm:max-w-4xl">
                        <h1 className="mx-auto  font-display text-4xl font-bold tracking-normal text-gray-300 sm:text-5xl text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white ">
                            Generated links
                        </h1>

                    </div>
                    <div className='grid justify-center mx-auto space-y-3'>
                        <ShortLinks shortedLinks={gitUrl} />
                        {urls.map((url, index) => (
                            <div key={index} className="flex">
                                <ShortLinks shortedLinks={url} />
                            </div>
                        ))}

                    </div>
                </div >
                <div className='pb-28 py-20 sm:py-32' >
                    <div className="mx-auto text-center py-9 sm:py-16 max-w-[320px] sm:max-w-4xl">
                        <h1 className="mx-auto  font-display text-4xl font-bold tracking-normal text-gray-300 sm:text-5xl text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white py-4">
                            Powerful Access Control
                        </h1>

                    </div>
                    <div >
                        <Features />
                    </div>
                </div >
                <div className="mx-auto max-w-2xl text-center font-display text-2xl font-extrabold tracking-normal text-gray-300 sm:text-5xl pb-24 text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white ">
                    Protect your links now!
                </div>
            </div >
        </>
    )
}

export default Home