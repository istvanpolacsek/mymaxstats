import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Navigation from '../components/navigation';
import CookieModal from '../components/cookiemodal';
import LoadingSpinner from '../components/loadingspinner';
import HeadMessage from '../components/headmessage';

const Home = ({ children }) => {
  return (
    <>
      <HeadMessage message={'Home'}/>
      <CookieModal />
      <Navigation />
      { children }
      <LoadingSpinner target={children}/>
    </>
  )
}

export default Home;