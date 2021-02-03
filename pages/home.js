import Head from 'next/head';
import Navigation from '../components/navigation';
import CookieModal from '../components/cookiemodal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ children }) => {

  return (
    <>
      <Head>
        <title>My Stats</title>
      </Head>
      <CookieModal />
      <Navigation />
      { children }
    </>
  )
}

export default Home;