import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from'react-bootstrap/OverlayTrigger';
import { FiCheck, FiTrash, FiX } from 'react-icons/fi';

const DeleteButton = (props) => {
    const tableid = props.tableid;
    
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const handleDelete = () => {
        setIsDeleting(true);
        deleteRecordTable();
    }
    
    const deleteRecordTable = async () => {
        try {
            const deleted  = await fetch(`/api/recordtables/${tableid}`, {
                method: "DELETE"
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }   

    return (
        <>
            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>Delete</Tooltip>}> 
                <Button onClick={handleShow} variant="outline-dark" style={{paddingLeft: 25, paddingRight: 25}}><FiTrash/></Button>
            </OverlayTrigger>
            <Modal centered show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button disabled={isDeleting} variant="danger" onClick={handleDelete}>
                        {isDeleting ? 
                            <Spinner as="span" size="sm" animation="border"/> : 
                            <FiCheck/>}
                    </Button>
                    <Button disabled={isDeleting} variant="secondary" onClick={handleClose}><FiX/></Button>
                </Modal.Footer>
            </Modal>            
        </>
    );

}
 
export default DeleteButton;