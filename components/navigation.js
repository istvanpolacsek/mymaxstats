import { signin, signout, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import cookieCutter from 'cookie-cutter';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const age = new Date();
  age.setMonth(age.getMonth() + 1);
  
  const [session] = useSession();

  useEffect(() => setIsDisabled(true), [session]);

  return (
    <Navbar fixed="top" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Stats</Navbar.Brand>    
          {!session && (
            <Button
              disabled={isDisabled}
              as="a"
              variant="outline-light"
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault()
                cookieCutter.set('session', 'true', { expires: age })
                signin()
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
                disabled={!isDisabled}
                as="a" 
                variant="outline-light"
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  cookieCutter.set('session', 'true', { expires: new Date(0) })
                  signout().then(router.reload())
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