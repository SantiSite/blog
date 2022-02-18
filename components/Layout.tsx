import React, { Fragment } from 'react';
import { Header } from '../components';

const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default Layout;
