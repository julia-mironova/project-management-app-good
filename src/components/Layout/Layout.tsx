import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SnackbarMessage from '../SnackbarMessage';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <SnackbarMessage />
      <Footer />
    </>
  );
};

export default Layout;
