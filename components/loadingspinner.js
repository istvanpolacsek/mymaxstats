import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoadingSpinner = (props) => {
    const target = props.target;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(false);
      }, [target]);

    return (
        <>
            {visible && (
                <Row style={{marginTop: 15}} >
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" ></Spinner>
                    </Col>
                </Row>
            )}
        </>
    );
}
 
export default LoadingSpinner;