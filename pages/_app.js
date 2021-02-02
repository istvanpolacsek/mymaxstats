import { Provider } from 'next-auth/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
      <Provider session={session}>
        <Home>
          <Component {...pageProps}/>
        </Home>
      </Provider>
    )
}
 
export default App
