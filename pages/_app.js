import React from 'react';
import { wrapper } from '../store';

const MyApp = ({Component, pageProps}) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);
