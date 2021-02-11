import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { signIn, useSession } from 'next-auth/client';
import { FiPlus } from 'react-icons/fi';
import cookie from 'cookie';
import TooltipButton from '../components/tooltipbutton';
import ThumbnailCard from '../components/thumbnailcard';
import LoadingSpinner from '../components/loadingspinner';
import { useState, useEffect } from 'react'
import CookieModal from '../components/cookiemodal';
import HeadMessage from '../components/headmessage';

const appurl = process.env.NEXT_PUBLIC_URL;

const Index = ({ data, consent }) => {
  const [session, loading] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    setHeight(window.innerHeight);
  })

  useEffect(() => {
    if (!consent) {
      setShowModal(true);
    } 
  }, [consent])

  const recordTables = session 
    ? data.
      filter(recordTable => recordTable.userid == session.user.id).
      sort((a, b) => (b.year > a.year) ? 1 : (a.year === b.year) ? ((b.month > a.month) ? 1 : -1) : -1 ) 
    : null

  return (
    <>
      <HeadMessage message={'Home'} />
      <CookieModal show={showModal}></CookieModal>
      {!loading && !session && (
        <Container style={{height: height}} className="text-light bg-secondary" fluid>
          <Row style={{height: '100%'}} className="align-items-center">  
          <Col xs="12" sm="12" md="6" lg="6" xl="6" className="d-flex justify-content-center align-self-end justify-content-md-end align-self-md-center">
            <h4>Sign In Using:</h4>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="6" className="d-flex justify-content-center align-self-start justify-content-md-start align-self-md-center">
            <TooltipButton size="lg" placement="top" tooltip="Sign In Using Google" icon="Google" variant={"outline-light"} function={() => signIn('google')}/>
          </Col>
          </Row>
        </Container>
      )}
      {loading && (
        <Container style={{ paddingTop: 70 }}>
          <LoadingSpinner/>
        </Container>
      )}
      {session && ( 
            <Container style={{ paddingTop: 70, paddingBottom: 50 }}>
            <Row>
            <Container>
              <TooltipButton placement="top" tooltip="New Table" icon={<FiPlus/>} href={"/newtable"} block={true} variant={"outline-dark"}/>
            </Container>
            {recordTables.map(recordTable => {
              return (
                <Col xs="12" sm="12" md="6" lg="4" xl="4" key={recordTable._id}>
                <ThumbnailCard recordTable={recordTable}/>
                </Col>
              )
            })}
            </Row>
            </Container>
      )}
    </>
  )
}

Index.getInitialProps = async ({req}) => {
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  const consent = cokkies.cookieconsent ? true : false;
  const res = await fetch(`${appurl}/api/recordtables`);
  const { data } = await res.json();

  return { data: data, cookies: cookies && cookies };
}

export default Index