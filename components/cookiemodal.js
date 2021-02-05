import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CookieModal = (props) => {
    
    const [show, setShow] = useState(false);
    
    const [cookie, setCookie] = useCookies(['cookieConsent']);

    const handleClose = () => {
        setShow(false);
        setCookie('cookieConsent', 'true', {
          path: '/',
          maxAge: 3*365*24*60*60,
          secure: true,
          sameSite: 'strict'
        })
    }

    const renderModal = () => { return(
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
          <Button variant="success" onClick={handleClose}>I Agree</Button>
        </Modal.Footer>
      </Modal>
    )}

    useEffect(() => {
      props.consent ? setShow(false) : setShow(true);
    }, []);

    return (
        <div onClick={e => e.stopPropagation()}>
          {show && renderModal()}
        </div>
      );
}

export default CookieModal