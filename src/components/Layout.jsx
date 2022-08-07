import React from 'react';
import Footer from './Footer';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <div>
      <CssBaseline>
      <Header />
      <Container maxWidth="xl">
        {children}
      </Container>
      <Footer />
      </CssBaseline>
    </div>
  );
};
export default Layout;
