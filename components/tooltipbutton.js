import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState } from 'react';

const TooltipButton = (props) => {
    const [touch, setTouch] = useState(false);
    
    useEffect(() => {
        if (window.navigator.maxTouchPoints > 0) setTouch(true);
    })

    return (
        <>
            {touch &&
                <Button
                    onClick={props.function}
                    href={props.href}
                    type={props.type}
                    style={{paddingLeft: 25, paddingRight: 25}}
                    size={props.size}
                    variant={props.variant}
                    block={props.block}
                >
                    {props.icon}
                </Button>
            }
            {!touch &&
                <OverlayTrigger 
                placement={props.placement}
                overlay={<Tooltip>{props.tooltip}</Tooltip>}>
                    <Button
                        onClick={props.function}
                        href={props.href}
                        type={props.type}
                        style={{paddingLeft: 25, paddingRight: 25}}
                        size={props.size}
                        variant={props.variant}
                        block={props.block}
                    >
                        {props.icon}
                    </Button>
            </OverlayTrigger>
            }
        </>
    );
}
 
export default TooltipButton