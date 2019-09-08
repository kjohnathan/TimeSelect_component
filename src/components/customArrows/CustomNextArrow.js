import React from 'react';
import arrSvg from './ToRightArr.svg';

import classes from './CustomNextArrow.module.scss';

const customNextArrow = (props) => {

    return (
        <div className={classes.ArrowContainer}>
            <img 
                src={arrSvg}
                onClick={props.onClick}
                style={{...props.style, height: '25px', display: 'block', width: '25px', margin: '0'}}/>
        </div>
    )
}

export default customNextArrow;