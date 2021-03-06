import { AppProps } from 'next/app';
import Router from 'next/router';
import Nprogress from 'nprogress';
import { AnimatePresence } from 'framer-motion';

import 'antd/dist/antd.css';

import 'styles/global.scss';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default App;
