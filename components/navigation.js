import { signin, signout, useSession } from 'next-auth/client';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
  const [session] = useSession()

  return (
      <Navbar bg="dark" variant="dark">
          {!session && (
            <Container>
              <Navbar.Brand>My Stats</Navbar.Brand>
              <a 
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault()
                signin()
              }}                
              >
                <Button>Log In</Button>
              </a>
              </Container>

          )}
          {session && (
            <Container>
              <Navbar.Brand>My Stats</Navbar.Brand>
              <img src={session.user.image} alt="profile" style={{ width:35, height: 35, borderRadius: 35 }} />
              <a 
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signout()
                }}                
              >
                <Button>Log Out</Button>
              </a>
            </Container>
          )}
      </Navbar>
    );
}
 
export default Navigation