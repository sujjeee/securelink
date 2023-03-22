import axios from 'axios';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js'

export async function getServerSideProps(context) {
    const { url } = context.params;
    const hostName = context.req.headers.host;

    // if you want to use in localhost then turn 'https' to 'http' 
    const response = await fetch(`https://${hostName}/api/redirect?link=https://${hostName}/${url}`);
    const data = await response.json();

    if (data.success === true) {
        if (data.protection === true) {
            return {
                props: {
                    requiresPassword: true,
                    shortUrl: `https://${hostName}/${url}`,
                },
            };
        } else {
            const encryptedString = data.destinationUrl
            const decryptedName = CryptoJS.AES.decrypt(encryptedString, process.env.NEXT_PUBLIC_NEXTAUTH_KEY).toString(CryptoJS.enc.Utf8)
            return {
                redirect: {
                    destination: decryptedName,
                    permanent: false,
                },
            };
        }
    } else {
        return {
            notFound: true,
        };
    }
}


export default function Page({ shortUrl }) {

    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/redirect', {
                password,
                shortUrl,
            });

            if (response.data.success === true) {
                const encryptUrl = response.data.destinationUrl
                var decryptUrl = CryptoJS.AES.decrypt(encryptUrl, process.env.NEXT_PUBLIC_NEXTAUTH_KEY).toString(CryptoJS.enc.Utf8);
                window.location.href = decryptUrl
            }
        } catch (error) {
            console.error('error:', error);
            alert("worng cred!")
        }
    }

    function handleChange(event) {
        setPassword(event.target.value);
    }

    return (
        <main className="flex h-[80vh] sm:h-screen w-screen items-center justify-center ">
            <div className="w-full max-w-md overflow-hidden sm:rounded-2xl border border-zinc-800 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-zinc-400 bg-[#0E1013] px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-white">Password Required</h3>
                    <p className="text-sm text-gray-100">This link is password protected. Please enter the password to view it.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-[#2B2A2D] px-4 py-8 sm:px-16">
                    <div>
                        <label htmlFor="password" className="block text-xs text-gray-100">PASSWORD</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input type="password" value={password} onChange={handleChange} id="password" required className="border p-2.5 border-gray-300 text-gray-900 placeholder-gray-900 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md pr-10 focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                    <button type="submit" className="border-black bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none">
                        <p>Authenticate</p>
                    </button>
                </form>
            </div>
        </main>
    );
}

