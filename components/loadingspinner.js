import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoadingSpinner = () => {
    return (
        <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Spinner variant="dark" animation="border" ></Spinner>
                </Col>
            </Row>
       </Container>
    );
}
 
export default LoadingSpinner;