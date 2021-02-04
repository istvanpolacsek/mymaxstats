import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from'react-bootstrap/OverlayTrigger';
import { useState } from 'react';

const BackArrow = () => {

    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    const [visible, setVisible] = useState(true);

    const toggleVis = () => {
        
        visible ? setVisible(false) : setVisible(true)
        console.log(visible);
    }

    return (
        <OverlayTrigger defaultShow={!visible} show={!visible} onToggle={toggleVis} placement="right" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>Back</Tooltip>}> 
            <Button size="lg" style={{paddingLeft: 25, paddingRight: 25}} variant="outline-dark" onClick={toggleVis, goBack}><FiArrowLeft/></Button>
        </OverlayTrigger>
      );
}
 
export default BackArrow;