import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSession } from 'next-auth/client';
import { FiPlus } from 'react-icons/fi';
import cookie from 'cookie';
import CookieModal from '../components/cookiemodal';
import TooltipButton from '../components/tooltipbutton';
import ThumbnailCard from '../components/thumbnailcard';
import LoadingSpinner from '../components/loadingspinner';

const appurl = process.env.NEXT_PUBLIC_URL;

const Index = ({ recordTables, cookies }) => {
  const [session] = useSession();

  return (
    <>
      <Container style={{ paddingTop: 70 }}>
        {session && !recordTables && (<LoadingSpinner />)}
        <Row>
          {session && ( 
            <>
            <Container>
              <TooltipButton placement="top" tooltip="New Table" icon={<FiPlus/>} href={"/newtable"} block={true} variant={"outline-dark"}/>
            </Container>
            {recordTables
              .filter(recordTable => recordTable.userid == session.user.id)
              .sort((a, b) => (b.year > a.year) ? 1 : (a.year === b.year) ? ((b.month > a.month) ? 1 : -1) : -1 )
              .map(recordTable => {
              return (
                <Col xs="12" sm="12" md="6" lg="4" xl="4" key={recordTable._id}>
                <ThumbnailCard recordTable={recordTable}/>
                </Col>
              )
            })}
            </>
          )}
        </Row>
        <Row style={{paddingTop: 60}}/>
      </Container>
    </>
  )
  
}

Index.getInitialProps = async ({req}) => {
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  const res = await fetch(`${appurl}/api/recordtables`);
  const { data } = await res.json();

  return { recordTables: data, cookies: cookies && cookies };
}

export default Index