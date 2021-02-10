import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation';
import HeadMessage from '../components/headmessage';

const Home = ({ children }) => {
  
  return (
    <>
      <HeadMessage message={'Home'}/>
      <Navigation />
      { children }
    </>
  )
}

export default Home;

