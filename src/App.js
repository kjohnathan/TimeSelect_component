import React, { Component } from 'react';
import classes from './App.module.scss';
import { connect } from 'react-redux';

import InfoPage from './components/InfoPage/InfoPage';
import TeacherSelection from './container/TeacherSelection/TeacherSelection';
import TimeSelectLayout from './Layout/TimeSelectLayout';
import Confirmation from './components/Confirmation/Cofirmation';

import * as actions from './store/action/actions';

class App extends Component {
    state = {
        chineseName: '',
        engName: '',
        masterId: '',
        step: 'info_page',
        datetime_string: '',
        isConfirming: false,
        selectedDate_timeList: null
    }

    makeReservation = (dateTimeString, masterId) => {
        this.setState({
            datetime_string: dateTimeString,
            masterId: masterId
        })

        this.props.nextStep();
    }

    render(){
        console.log(this.props);
        if (this.props.step === 'info_page'){
            return (
                <div className={classes.App}>
                    <InfoPage 
                        onChangeHandler={this.props.onChangeHandler}
                        chineseName={this.props.chineseName}
                        engName={this.props.engName}
                        nextStep={this.props.nextStep}/>
                </div>
            );
        } else if (this.props.step === 'teacher_select'){
            return (
                <div className={classes.App}>
                    <TeacherSelection
                        masterGid={this.props.masterGid}
                        onSelectMasterGroup={this.props.onSelectMasterGroup}
                        nextStep={this.props.nextStep}
                        prevStep={this.props.prevStep}/>
                </div>
            )
        } else if (this.props.step === 'time_select'){
            return (
                <div className={classes.App}>
                    <TimeSelectLayout
                        prevStep={this.props.prevStep}
                        masterGid={this.props.masterGid}
                        datetime_string={this.props.datetime_string}
                        setDateTimeString={this.props.setDateTimeString}
                        selectedDate_timeList={this.props.selectedDate_timeList}
                        setSelectedDate_timeList={this.props.setSelectedDate_timeList}
                        makeReservation={this.makeReservation}/>
                </div>
            )
        } else if (this.props.step === 'finished'){
            console.log(this.props.datetime_string);
            return (
                <div className={classes.App}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>已完成預約！</h3>
                        <p>姓名：{this.props.chineseName}</p>
                        <p>師傅：{this.state.masterId}</p>
                        <p>時間：{this.props.datetime_string.getFullYear()}年
                                {this.props.datetime_string.getMonth()+1}月
                                {this.props.datetime_string.getDate()}日
                        </p>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        chineseName: state.chineseName,
        phoneNumber: state.phoneNumber,
        masterGid: state.masterGid,
        step: state.step,
        selectedDate_timeList: state.selectedDate_timeList,
        datetime_string: state.datetime_string
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeHandler: (e, language_of_name) => dispatch(actions.onChangeHandler(e, language_of_name)),
        onSelectMasterGroup: (teacherName) => dispatch(actions.onSelectMasterGroup(teacherName)),
        nextStep: () => dispatch(actions.nextStep()),
        prevStep: () => dispatch(actions.prevStep()),
        setDateTimeString: (datetimestring) => dispatch(actions.setDateTimeString(datetimestring)),
        setSelectedDate_timeList: (timeList) => dispatch(actions.setSelectedDate_timeList(timeList)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
