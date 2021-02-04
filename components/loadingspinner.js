import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoadingSpinner = (props) => {
    const target = props.target;

    const [visible, setVisible] = useState('visible');

    useEffect(() => {
        setVisible('invisible');
      }, [target]);

    return (
        <Container className={visible}>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Spinner variant="dark" animation="border" ></Spinner>
                </Col>
            </Row>
       </Container>
    );
}
 
export default LoadingSpinner;