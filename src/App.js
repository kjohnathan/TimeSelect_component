import React, { Component } from 'react';
import classes from './App.module.scss';
import { connect } from 'react-redux';

import InfoPage from './components/InfoPage/InfoPage';
import TeacherSelection from './container/TeacherSelection/TeacherSelection';
import TimeSelectLayout from './Layout/TimeSelectLayout';

import * as actions from './store/action/actions';

import flex from './flex';

const liff = window.liff;

class App extends Component {
    constructor(props){
        super(props);
        this.initializeLIFF = this.initializeLIFF.bind(this);
    }
    
    state = {
        masterId: '',
        step: 'info_page',
        datetime_string: '',
        isConfirming: false,
        selectedDate_timeList: null,
    }

    componentDidMount(){
        console.log(liff);
        this.initializeLIFF();
    }

    makeReservation = (master_id, time) => {
        const year_string = `${this.props.datetime_string.getFullYear()}`;
        const month_string = (
            this.props.datetime_string.getMonth() + 1> 10?
            `${this.props.datetime_string.getMonth() + 1}`: '0' + `${this.props.datetime_string.getMonth() + 1}`
        )
        const date_string = (
            this.props.datetime_string.getDate() > 10?
            `${this.props.datetime_string.getDate()}`: '0' + `${this.props.datetime_string.getDate()}`
        )

        const datetime_string = year_string + month_string + date_string + time;
        console.log(datetime_string);
        const saved_data = {
            master_id: master_id,
            dt: datetime_string,
            line_id: this.props.line_id,
            name: this.props.chineseName,
            phone: this.props.phoneNumber
        }
        const reservation_data = new FormData();
        for ( let ele in saved_data){
            reservation_data.append(ele, saved_data[ele]);
        }

        console.log(reservation_data);

        fetch('https://hsintian.tk/api/reservation/post', {
            method: 'POST',
            body: reservation_data
        })
        .then(res => res.json())
        .then(data => {
            if (data.status ==='success'){
                liff.sendMessages([
                    flex
                ])
                .then(() => {
                    console.log('123');
                    this.props.setErrorMsg('msg sent');
                })
                .catch(err => this.props.setErrorMsg(`${err}`));
            }
        })
        .catch(err => console.log(err))
    }

    initializeLIFF(){
        liff.init( async data => {
            const profile = await liff.getProfile();

            console.log(profile.userId);
            this.props.setInfoContent('line_id', profile.userId);
            this.props.setInfoContent('line_data_status', 'success');
        }, err => {
            console.log(err)
        })
    }

    componentDidUpdate(){
        if (this.props.line_id && this.props.line_data_status === 'success'){
            fetch('https://hsintian.tk/api/customer/get/?line_id=' + this.props.line_id, {
                method: 'get'
            })
            .then( res => res.json())
            .then( data => {
                this.props.setInfoContent('chineseName', data.info.name);
                this.props.setInfoContent('phoneNumber', data.info.phone);
                this.props.setInfoContent('line_data_status', 'used');
            })
            .catch(err => err);
        }
    }

    render(){
        console.log(this.props);
        if (this.props.step === 'info_page'){
            return (
                <div className={classes.App}>
                    <p>{this.props.line_id}</p>
                    {this.props.line_data_status?
                        <p>success</p>: <p>failed</p>}
                    <InfoPage 
                        onChangeHandler={this.props.onChangeHandler}
                        chineseName={this.props.chineseName}
                        phoneNumber={this.props.phoneNumber}
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
            if (this.props.errMsg !== null){
                return (
                    <div className={classes.App}>
                        <p>{this.props.errMsg}</p>
                    </div>
                )
            } else {
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
            }
            
        } else if (this.props.step === 'finished'){
            console.log(this.props.datetime_string);
            if (this.props.errMsg !== null){
                return (
                    <div className={classes.App}>
                        <p>{this.props.errMsg}</p>
                    </div>
                )
            } else {
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
}

const mapStateToProps = state => {
    return {
        chineseName: state.chineseName,
        phoneNumber: state.phoneNumber,
        masterGid: state.masterGid,
        step: state.step,
        selectedDate_timeList: state.selectedDate_timeList,
        datetime_string: state.datetime_string,
        line_id: state.line_id,
        line_data_status: state.line_data_status,
        errMsg: state.errMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setInfoContent: (infoType, updatedValue) => dispatch(actions.setInfoContent(infoType, updatedValue)),
        onChangeHandler: (e, language_of_name) => dispatch(actions.onChangeHandler(e, language_of_name)),
        onSelectMasterGroup: (teacherName) => dispatch(actions.onSelectMasterGroup(teacherName)),
        nextStep: () => dispatch(actions.nextStep()),
        prevStep: () => dispatch(actions.prevStep()),
        setDateTimeString: (datetimestring) => dispatch(actions.setDateTimeString(datetimestring)),
        setSelectedDate_timeList: (timeList) => dispatch(actions.setSelectedDate_timeList(timeList)),
        setErrorMsg: (errMsg) => dispatch(actions.setErrorMsg(errMsg))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
