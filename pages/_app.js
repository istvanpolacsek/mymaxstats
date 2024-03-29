import { Provider } from 'next-auth/client';
import Home from './home';

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Home>
        <Component {...pageProps}/>
      </Home>
    </Provider>
    )
}
 
export default App
