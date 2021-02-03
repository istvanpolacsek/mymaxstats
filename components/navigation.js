import { signin, signout, useSession } from 'next-auth/client';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Navigation = () => {
  const [session] = useSession();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    setIsLoggingIn(false);
  }, [session]);

  return (
    <Navbar fixed="top" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Stats</Navbar.Brand>
        {!session && isLoggingIn && <Spinner animation="border" variant="secondary"/>}
          {!session && (
            <Button
              as="a"
              variant="outline-light"
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault()
                signin()
                setIsLoggingIn(true);
              }}     
              style={{ paddingLeft: 25, paddingRight: 25 }}           
            >
              <FiLogIn/>
            </Button>
          )}
          {session && (
            <>
            <img src={session.user.image} alt="profile" style={{ width:35, height: 35, borderRadius: 35 }} /> 
            <ButtonGroup>
              <Button href="/newtable" variant="outline-light" style={{paddingLeft: 25, paddingRight: 25}}><FiPlus/></Button>
              <Button 
                as="a" 
                variant="outline-light"
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signout()
                }}
                style={{paddingLeft: 25, paddingRight: 25}}                
              >
                <FiLogOut/>
              </Button>
            </ButtonGroup>
            </>
          )}
      </Container>
    </Navbar>    
  );
}
 
export default Navigation