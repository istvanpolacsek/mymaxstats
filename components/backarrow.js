import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from'react-bootstrap/OverlayTrigger';

const BackArrow = () => {
    
    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    return (
        <OverlayTrigger placement="right" delay={{ show: 250, hide: 250 }} overlay={<Tooltip>Back</Tooltip>}> 
            <Button size="lg" style={{paddingLeft: 25, paddingRight: 25}} variant="outline-dark" onClick={goBack}><FiArrowLeft/></Button>
        </OverlayTrigger>
      );
}
 
export default BackArrow;