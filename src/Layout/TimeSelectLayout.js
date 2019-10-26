import React, { Component } from 'react';

import MonthSlider from '../container/MonthSlider/MonthSlider';
import SimpleSlider from '../container/SimpleSlider/SimpleSlider';
import TimeSelection from '../container/TimeSelection/TimeSelection';
import Spinner from '../UI/Spinner/spinner';
import BackDrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';
import Aux from '../hoc/aux';

import classes from './TimeSelectLayout.module.scss';

class TimeSelectLayout extends Component {
    constructor(props){
        super(props);
    }

    state = {
        currentDate_object: new Date(),
        selectedDate_object: new Date()
    }

    selectMonth = (month) => {
        if ( month.getFullYear() === this.state.currentDate_object.getFullYear() && month.getMonth() === this.state.currentDate_object.getMonth()){
            this.setState({
                selectedDate_object: new Date()
            })
        } else {
            this.setState({ selectedDate_object: month })
            console.log(month);
        }
    }
    
    render(){
        console.log(this.state.selectedDate_object);
        return (
            <div className={classes.timeSelectLayout}>
                {
                    this.props.isPending?
                    (
                        <Aux>
                            <BackDrop />
                            <Spinner />
                        </Aux>
                    ): null
                }

                <div className={classes.TitleBar}>
                    <div className={classes.ButtonContainer}>
                        <Button
                            onClickHandler={this.props.prevStep}>
                            上一步
                        </Button>
                    </div>
                    <div>
                        <h2 id={classes.timeSelectTitle}>請選擇時間</h2>
                    </div>
                </div>
                <div className={classes.YearAndMonthBar}>
                    <h2 className={classes.YearBar}>
                        { this.state.selectedDate_object ?
                            `${this.state.selectedDate_object.getFullYear()}` + '年':
                            null
                        }
                    </h2>
                    <MonthSlider 
                        currentDate_object={this.state.currentDate_object} 
                        selectMonth={this.selectMonth.bind(this)}/>
                </div>
                <div className={classes.DateSliderContainer}>
                    <SimpleSlider 
                        currentDate_object={this.state.currentDate_object}
                        selectedDate_object={this.state.selectedDate_object}
                        setDateTimeString={this.props.setDateTimeString}
                        setSeletedDateTimeListHandler={this.props.setSeletedDateTimeListHandler}
                        masterGid={this.props.masterGid}
                        setSelectedDate_timeList={this.props.setSelectedDate_timeList}
                        fetchTime={this.props.fetchTime}/>
                </div>
                <TimeSelection
                    isFetchingTime={this.props.isFetchingTime}
                    datetime_string={this.props.datetime_string}
                    selectedDate_timeList={this.props.selectedDate_timeList}
                    onSelectClassTimeHandler={this.props.onSelectClassTimeHandler}
                    makeReservation={this.props.makeReservation}/>
            </div>
        )
    }
}

export default TimeSelectLayout;