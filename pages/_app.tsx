import { MyContextProvider } from '../contexts/MainContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MyContextProvider>
            <Component {...pageProps} />
        </MyContextProvider>
    );
}

export default MyApp;
