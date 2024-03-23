import './globals.css'
import 'tailwindcss/tailwind.css';


import Header from './header/header'
export default function MyApp({ Component, pageProps }) {
    return (
        <div className=''>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}
