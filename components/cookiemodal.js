import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Button from 'react-bootstrap/Button';
import { FiCheck } from 'react-icons/fi';

const CookieModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    localStorage.setItem('cookieconsent', 'true');
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.show) handleShow();
  }, [props])

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <ModalHeader>
        <ModalTitle>Cookie Consent</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>This website uses cookies to delivers its services</p>
      </ModalBody>
      <ModalFooter>
          <Button variant="outline-success" onClick={handleClose}><FiCheck/></Button>
      </ModalFooter>
    </Modal>
   );
}

export default CookieModal