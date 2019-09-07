import React from 'react';
import arrSvg from './ToLeftArr.svg';

import classes from './CustomPrevArrow.module.scss';

const customPrevArrow = (props) => {
    return (
        <div className={classes.ArrowContainer}>
            <img 
                src={arrSvg} 
                onClick={props.onClick}
                style={{...props.style, height: '25px', display: 'block', width: '25px', margin: '0', display: 'inline-block'}}/>
        </div>
    )
}

export default customPrevArrow;