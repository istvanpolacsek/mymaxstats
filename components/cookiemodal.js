import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CookieModal = (props) => {
    
    const [enable, setEndable] = useState(false);
    const [show, setShow] = useState(!props.consent);
    const [cookie, setCookie] = useCookies(['cookieConsent']);

    const age = new Date();
    age.setFullYear(age.getFullYear() + 3);

    const handleClose = () => {
        setShow(false);
        setCookie('cookieConsent', 'true', {
          path: '/',
          maxAge: age,
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
      setEndable(true);
    }, [props]);

    return (
        <div onClick={e => e.stopPropagation()}>
          {enable && renderModal()}
        </div>
      );
}

export default CookieModal