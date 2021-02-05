import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useRef, useState } from 'react';

const TooltipButton = (props) => {
    
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const ref = useRef(null);

    const handleShow = (event) => {
        setTarget(event.target);
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
    }

    return (
        <>
            <Overlay  placement={props.placement} target={target} show={show} container={ref.current}>
                <Tooltip>{props.tooltip}</Tooltip>
            </Overlay>
            <Button 
                onMouseEnter={handleShow} 
                onMouseLeave={handleHide} 
                size={props.size}
                style={{paddingLeft: 25, paddingRight: 25}}
                variant={props.variant}
                onClick={props.function}
                block={props.block}
                type={props.type}
                href={props.href}
            >
                {props.icon}
            </Button>
        </>
    );
}
 
export default TooltipButton