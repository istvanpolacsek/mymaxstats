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
import { useSession } from 'next-auth/client';
import { FiEdit2, FiEye, FiPlus } from 'react-icons/fi';
import { months } from '../utils/months.json'

const appurl = process.env.NEXTAUTH_URL;

const Index = ({ recordTables }) => {
  const [session] = useSession();

  return (
    <Container style={{ paddingTop: 56 }}>
      <Row>
      {session && ( 
        <>
        <Button href="/newtable" block size="lg" variant="outline-dark" style={{ margin: 15 }}><FiPlus/></Button>
        {recordTables
          .filter(recordTable => recordTable.userid == session.user.id)
          .sort((a, b) => (b.year > a.year) ? 1 : (a.year === b.year) ? ((b.month > a.month) ? 1 : -1) : -1 )
          .map(recordTable => {
          return (
            <Col xs="12" sm="12" md="6" lg="4" xl="4" key={recordTable._id}>
            <Card bg="light" key={recordTable._id} style={{ marginTop: 15 }}>
              <Card.Body>
                <Card.Title className="text-dark text-center">{recordTable.year} {months[recordTable.month-1]}</Card.Title>
              </Card.Body>
              <ListGroup variant="flush">
              {recordTable.records.map(record => (
                  <ListGroupItem variant="light" className="d-flex justify-content-between" key={record._id}>
                    <div>{record.record}</div>
                    <div>{record.value}</div>
                  </ListGroupItem>
              ))}
              </ListGroup>
              <Card.Body>
                <ButtonToolbar className="justify-content-center">
                  <ButtonGroup size="lg">
                    <Button href={`/${recordTable._id}`} variant="outline-dark"><FiEye/></Button>
                    <Button href={`/${recordTable._id}/edit`} variant="outline-dark"><FiEdit2/></Button>                
                  </ButtonGroup>
                </ButtonToolbar>
              </Card.Body>
            </Card>
            </Col>
          )
        })}
        </>)}
      </Row>
    </Container>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(`${appurl}/api/recordtables`);
  const { data } = await res.json();

  return { recordTables: data };
}

export default Index