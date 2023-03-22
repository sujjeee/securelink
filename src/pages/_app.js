import { store } from '@/redux/store'
import '@/styles/globals.css'
import Script from 'next/script'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />

      <Script
        strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  )
}
