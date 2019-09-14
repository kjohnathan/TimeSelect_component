import React from 'react';

import SimpleSlider from '../container/SimpleSlider/SimpleSlider';
import TimeSelection from '../container/TimeSelection/TimeSelection';

import classes from './TimeSelectLayout.module.scss';

const timeSelectLayout = (props) => {
    return (
        <div className={classes.timeSelectLayout}>
            <div>
                <button
                    onClick={props.prevStep}>上一步</button>
                <h2>請選擇時間</h2>
                <div id={classes.spaceDiv}></div>
            </div>
            <SimpleSlider 
                setDateTimeString={props.setDateTimeString}
                setSeletedDateTimeListHandler={props.setSeletedDateTimeListHandler}
                masterGid={props.masterGid}
                setSelectedDate_timeList={props.setSelectedDate_timeList}/>
            <TimeSelection 
                datetime_string={props.datetime_string}
                selectedDate_timeList={props.selectedDate_timeList}
                onSelectClassTimeHandler={props.onSelectClassTimeHandler}
                makeReservation={props.makeReservation}/>
        </div>
    )
}

export default timeSelectLayout;