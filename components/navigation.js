import { signin, signout, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import TooltipButton from './tooltipbutton';

const Navigation = () => {
  const router = useRouter();

  const age = new Date();
  age.setMonth(age.getMonth() + 1);
  
  const [session] = useSession();

  return (
    <Navbar fixed="top" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Stats</Navbar.Brand>    
          {!session && (
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
                    signout().then(router.reload())
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