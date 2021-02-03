import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { FiEdit2 } from 'react-icons/fi';
import { months } from '../../utils/months.json';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import BackArrow from '../../components/backarrow.js';
import DeleteButton from '../../components/deletebutton.js';

const appurl = process.env.NEXT_PUBLIC_URL;

const RecordTable = ({ recordTable }) => {

    const router = useRouter();
    const [session] = useSession();

    const pformat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 1});
    const sformat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});

    const [ value, setValue ] = useState(100); 

    return (
        <Container style={{ paddingTop: 80 }}>
            {session && (<>
                <Row className="justify-content-center">
                    <Col>
                    <ButtonToolbar className="justify-content-between">
                        <BackArrow/>
                        <ButtonGroup size="lg">
                            <Button href={router.query.id + '/edit'} variant="outline-dark" style={{paddingLeft: 25, paddingRight: 25}}><FiEdit2/></Button>
                            <DeleteButton tableid={router.query.id}/>             
                        </ButtonGroup>
                    </ButtonToolbar>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{paddingTop: 20}}>
                    <Col>
                        <Card><Table hover responsive className="text-dark" >
                            <thead className="text-dark bg-light ">
                                <tr>
                                    <th className="col-7 h5">{recordTable.year} {months[recordTable.month]}</th>
                                    <th className="col-3 h5 text-right">{value}</th>
                                    <th className="col-2 h5 text-center">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordTable.records.map(record => (
                                    <tr key={record._id}>
                                        <td className="col-7">{record.record}</td>
                                        <td className="col-3 text-right">
                                            {(record.primary) ? pformat.format(Math.ceil(value*record.value/250)*2.5) : 
                                            (record.uom == 'm:s' ? sformat.format(record.value) : record.value)}
                                        </td>
                                        <td className="col-2 text-center">{record.uom}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table></Card>
                    </Col>
                </Row>
                <Container className="fixed-bottom">
                    <Form>
                        <Form.Group as={Row}>
                            <Col>
                                <RangeSlider
                                    size="lg"
                                    variant="secondary"
                                    tooltipPlacement="top"
                                    value = {value}
                                    step={5}
                                    min={60}
                                    max={100}
                                    onChange = {event => setValue(event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </>)}
        </Container>  
    )
}

RecordTable.getInitialProps = async ({ query: { id }}) => {
    const res = await fetch(`${appurl}/api/recordtables/${id}`);
    const { data } = await res.json();

    return { recordTable: data }
}

export default RecordTable