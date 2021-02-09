import { signin, signout, useSession } from 'next-auth/client';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import TooltipButton from './tooltipbutton';

const Navigation = () => {
  const [session, loading] = useSession();

  return (
    <Navbar fixed="top" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Stats</Navbar.Brand>    
          {!loading && !session && (
            <TooltipButton 
              placement="bottom"
              tooltip="Sign In"
              icon={<FiLogIn/>}
              variant={"outline-light"}
              function={
                (e) => {
                  e.preventDefault()
                  signin()
                }
              }
            />
          )}
          {loading && (
            <Spinner animation="border" size="sm" variant="light"/>
          )}
          {session && (
            <>
            <img src={session.user.image} alt="profile" style={{ width:35, height: 35, borderRadius: 35 }} /> 
            <ButtonGroup>
              <TooltipButton 
                placement="bottom"
                tooltip="New Table"
                icon={<FiPlus/>}
                variant="outline-light"
                href="/newtable"
              />
              <TooltipButton
                placement="bottom"
                tooltip="Log Out"
                icon={<FiLogOut/>}
                variant="outline-light"
                function={
                  (e) => {
                    e.preventDefault()
                    signout({ callbackUrl: '/' })
                  }
                }
              />
            </ButtonGroup>
            </>
          )}
      </Container>
    </Navbar>
  );
}
 
export default Navigation