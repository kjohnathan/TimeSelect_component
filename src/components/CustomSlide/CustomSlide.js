import React from 'react';

import classes from './CustomSlide.module.scss';

const customSlide = (props) => {
    const ch_dayArr = [
        '日',
        'ㄧ',
        '二',
        '三',
        '四',
        '五',
        '六',
    ]

    const currentDay = ch_dayArr[props.dateObject.getDay()];

    if (props.dateObject === props.onSelectDate){
        return (
            <div 
                className={classes.CurrentDateSlide}
                onClick={() => {
                    console.log(props.dateObject)
                    console.log(props.slideIndex);
                    props.selectDateHandler(props.dateObject);
                    props.setCurrentIndex(props.slideIndex - 1)
                }}>
                <h4>
                    {
                        `${props.dateObject.getMonth()+1}` + '/' +
                        `${props.dateObject.getDate()}` + 
                        `(${currentDay})`
                    }
                </h4>
            </div>
        )
    } else {
        return (
            <div 
                className={classes.Slide}
                onClick={() => {
                    console.log(props.dateObject);
                    console.log(props.slideIndex);
                    props.selectDateHandler(props.dateObject);
                    props.setCurrentIndex(props.slideIndex - 1)
            }}>
                <h4>
                    {
                        `${props.dateObject.getMonth()+1}` + '/' +
                        `${props.dateObject.getDate()}`
                    }
                </h4>
            </div>
        )
    }
}

export default customSlide;