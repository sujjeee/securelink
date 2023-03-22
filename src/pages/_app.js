import Navbar from '@/components/Navbar'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">

        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
