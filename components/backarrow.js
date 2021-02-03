import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';

const BackArrow = () => {
    
    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    return (
        <Button size="lg" style={{paddingLeft: 25, paddingRight: 25}} variant="outline-dark" onClick={goBack}><FiArrowLeft/></Button>
      );
}
 
export default BackArrow;