import React, { Component } from 'react';

import classes from './TimeSelection.module.scss';

class TimeSelection extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log('TimeSelection, componentDidMount');
    }

    onClickHandler = (e, number) => {
        this.props.onSelectClassTimeHandler(e, number);
    }

    onCancelClickHandler = (e) => {
        this.props.cancelClassTimeHandler(e);
    }

    render(){
        const timePeriodArr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        console.log('timeSelection', this.props.classTime);

        const timePeridDivs = timePeriodArr.map((ele, index) => {
            if (index === this.props.classTime - 1 && this.props.classTime !== ''){
                return (
                    <div className={classes.TimePeriodDiv}>
                        <p>按摩師傅: {ele}</p>
                        <button 
                            className={classes.ReserveButton}
                            onClick={(e) => this.onClickHandler(e)}>
                            取消
                        </button>
                    </div>
                )
            } else {
                return (
                    <div className={classes.TimePeriodDiv}>
                        <p>按摩師傅: {ele}</p>
                        <button 
                            id={classes.ReserveButton}
                            onClick={(e) => this.onClickHandler(e, ele)}>
                            預約
                        </button>
                    </div>
                )
            }
        })

        return (
            <div className={classes.TimeDivsContainer}>
                {timePeridDivs}
            </div>
        )
    }
}

export default TimeSelection;