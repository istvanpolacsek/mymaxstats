import { Provider } from 'next-auth/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import { CookiesProvider } from 'react-cookie';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <CookiesProvider>
      <Provider session={session}>
        
          <Home>
            <Component {...pageProps}/>
          </Home>
        
      </Provider>
      </CookiesProvider>
    )
}
 
export default App
