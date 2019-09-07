import React from 'react';

import SimpleSlider from '../container/SimpleSlider/SimpleSlider';
import TimeSelection from '../container/TimeSelection/TimeSelection';

import classes from './TimeSelectLayout.module.scss';

const timeSelectLayout = (props) => {
    return (
        <div className={classes.timeSelectLayout}>
            <SimpleSlider />
            <TimeSelection 
                prevStep={props.prevStep}
                popConfirmModal={props.popConfirmModal}
                classTime={props.classTime}
                onSelectClassTimeHandler={props.onSelectClassTimeHandler}
                cancelClassTimeHandler={props.cancelClassTimeHandler}/>
        </div>
    )
}

export default timeSelectLayout;