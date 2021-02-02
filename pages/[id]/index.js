import { useSession } from 'next-auth/client';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { FiArrowLeft, FiEdit2, FiCheck, FiTrash, FiX } from 'react-icons/fi';

const appurl = process.env.NEXT_PUBLIC_URL;

const RecordTable = ({ recordTable }) => {
    const [session] = useSession();
    const [show, setShow] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleDelete = () => {
        setIsDeleting(true);
        deleteRecordTable();
    }

    const deleteRecordTable = async () => {
        try {
            const deleted  = await fetch(`/api/recordtables/${router.query.id}`, {
                method: "DELETE"
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const goBack = () => {
        router.back();
    }

    return (
        <Container style={{ paddingTop: 80 }}>
            <Row className="justify-content-center">
                <Col>
                <ButtonToolbar className="justify-content-between">
                    <Button variant="outline-secondary" style={{ marginBottom: 15}} onClick={goBack}><FiArrowLeft/></Button>
                    <ButtonGroup size="lg">
                        <Button href={router.query.id + '/edit'} variant="outline-dark"><FiEdit2/></Button>
                        <Button onClick={handleShow} variant="outline-dark"><FiTrash/></Button>                
                    </ButtonGroup>
                </ButtonToolbar>
                    <Table responsive striped bordered className="text-dark" style={{ marginTop: 15 }}>
                        <thead className="text-dark">
                            <tr>
                                <th>{recordTable.year} {months[recordTable.month-1]}</th>
                                <th className="text-right">100.0</th>
                                <th className="text-center">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordTable.records.map(record => (
                                <tr key={record._id}>
                                    <td>{record.record}</td>
                                    <td className="text-right">{record.value}</td>
                                    <td className="text-center">{record.uom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal centered show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button disabled={isDeleting} variant="danger" onClick={handleDelete}>{isDeleting ? <Spinner as="span" size="sm" animation="border"/> : <FiCheck/>}</Button>
                    <Button disabled={isDeleting} variant="secondary" onClick={handleClose}><FiX/></Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

RecordTable.getInitialProps = async ({ query: { id }}) => {
    const res = await fetch(`${appurl}/api/recordtables/${id}`);
    const { data } = await res.json();

    return { recordTable: data }
}

export default RecordTable