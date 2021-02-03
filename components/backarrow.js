import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

const BackArrow = () => {
    
    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    return (
        <a className="text-dark" href="#" onClick={goBack}><h2><FiArrowLeft/></h2></a>
      );
}
 
export default BackArrow;