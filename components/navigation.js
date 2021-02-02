import { signin, signout, useSession } from 'next-auth/client';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FiHome, FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';

const Navigation = () => {
  const [session] = useSession();

  return (
    <Navbar fixed="top" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Stats</Navbar.Brand>
          {!session && (
            <a 
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault()
                signin()
              }}                
            >
              <Button variant="outline-light"><FiLogIn/></Button>
            </a>
          )}
          {session && (
            <>
              <img src={session.user.image} alt="profile" style={{ width:35, height: 35, borderRadius: 35 }} /> 
              <Button href="/newtable" variant="outline-light"><FiPlus/></Button>
              <a 
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signout()
                }}                
              >
                <Button variant="outline-light"><FiLogOut/></Button>
              </a>
            </>
          )}
      </Container>
    </Navbar>    
  );
}
 
export default Navigation