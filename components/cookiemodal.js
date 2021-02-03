import { useState, useEffect } from 'react';
import cookieCutter from 'cookie-cutter';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CookieModal = () => {
    const [show, setShow] = useState(false);

    const age = new Date();
    age.setFullYear(age.getFullYear() + 3);

    const handleClose = () => {
        setShow(false);
        cookieCutter.set('cookieConsent', 'true', { expires: age })
    }

    useEffect(() => {
        if (cookieCutter.get('cookieConsent') === 'true') {
            setShow(false);
        } else {
            setShow(true);
        };
    }, []);

    return (
        <div onClick={e => e.stopPropagation()}>
          <Modal
            show={show}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Cookie Consent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This webpage uses cookie to deliver its services.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleClose}>
                I Agree
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
}

export default CookieModal;