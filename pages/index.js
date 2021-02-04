import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from'react-bootstrap/OverlayTrigger';
import { useSession } from 'next-auth/client';
import { FiEdit2, FiEye, FiPlus } from 'react-icons/fi';
import { months } from '../utils/months.json';
import DeleteButton from '../components/deletebutton.js';

const appurl = process.env.NEXT_PUBLIC_URL;

const Index = ({ recordTables }) => {
  const [session] = useSession();

  const sformat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});

  const message='Dashboard'

  return (
     <>
    <Container style={{ paddingTop: 56 }}>
      <Row>
        {session && ( 
          <>
          <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>New Table</Tooltip>}>
            <Button href="/newtable" block size="lg" variant="outline-dark" style={{ margin: 15 }}><FiPlus/></Button>
          </OverlayTrigger>
          {recordTables
            .filter(recordTable => recordTable.userid == session.user.id)
            .sort((a, b) => (b.year > a.year) ? 1 : (a.year === b.year) ? ((b.month > a.month) ? 1 : -1) : -1 )
            .map(recordTable => {
            return (
              <Col xs="12" sm="12" md="6" lg="4" xl="4" key={recordTable._id}>
              <Card bg="light" key={recordTable._id} style={{ marginTop: 15 }}>
                <Card.Body>
                  <Card.Title as="a" href={`/${recordTable._id}`} className="h5 text-dark">{recordTable.year} {months[recordTable.month]}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                {recordTable.records.map(record => (
                    <ListGroupItem variant="light" className="d-flex justify-content-between" key={record._id}>
                      <div>{record.record}</div>
                      <div>{record.uom == 'm:s' ? sformat.format(record.value) : record.value}</div>
                    </ListGroupItem>
                ))}
                </ListGroup>
                <Card.Body>
                  <ButtonToolbar className="justify-content-center">
                    <ButtonGroup size="lg">
                      <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>View Table</Tooltip>}>
                        <Button href={`/${recordTable._id}`} variant="outline-dark" style={{paddingLeft: 25, paddingRight: 25}}><FiEye/></Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>Edit Table</Tooltip>}>
                      <Button href={`/${recordTable._id}/edit`} variant="outline-dark" style={{paddingLeft: 25, paddingRight: 25}}><FiEdit2/></Button>                
                      </OverlayTrigger>
                      <DeleteButton tableid={recordTable._id} />
                    </ButtonGroup>
                  </ButtonToolbar>
                </Card.Body>
              </Card>
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

Index.getInitialProps = async () => {
  const res = await fetch(`${appurl}/api/recordtables`);
  const { data } = await res.json();

  return { recordTables: data };
}

export default Index