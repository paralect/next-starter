import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PropTypes from 'prop-types';
import Head from 'next/head';

import queryClient from 'query-client';
import store from 'resources/store';
import ToasterProvider from 'components/Toast/ToastProvider';
import 'styles/globals.css';

import PageConfig from './PageConfig';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Ship</title>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToasterProvider />
        <PageConfig>
          <Component {...pageProps} />
        </PageConfig>
      </Provider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
