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
        teacherName: '',
        step: 'info_page',
        year: '',
        month: '',
        date: '',
        classTime: '',
        isConfirming: false
    }

    confirmReservation = (e) => {
        e.preventDefault();
        this.setState({
            step: 'finished'
        })
    }

    cancelReservation = (e) => {
        e.preventDefault();
        this.setState({
            isConfirming: false,
        })
    }

    onSelectClassTimeHandler = (e, classTime) => {
        e.preventDefault();
        this.setState({
            classTime
        })
    }

    cancelClassTimeHandler = (e) => {
        e.preventDefault();
        this.setState({
            classTime: ''
        })
    }

    render(){
        console.log(this.props);
        // if (this.props.step === 'info_page'){
        //     return (
        //         <div className={classes.App}>
        //             <InfoPage 
        //                 onChangeHandler={this.props.onChangeHandler}
        //                 chineseName={this.props.chineseName}
        //                 engName={this.props.engName}
        //                 nextStep={this.props.nextStep}/>
        //         </div>
        //     );
        // } else if (this.props.step === 'teacher_select'){
        //     return (
        //         <div className={classes.App}>
        //             <TeacherSelection
        //                 teacherName={this.props.teacherName}
        //                 onSelectTeacherHandler={this.props.onSelectTeacherHandler}
        //                 nextStep={this.props.nextStep}
        //                 prevStep={this.props.prevStep}/>
        //         </div>
        //     )
        // } else if (this.props.step === 'time_select'){
            return (
                <div className={classes.App}>
                    <TimeSelectLayout 
                        prevStep={this.props.prevStep}
                        nextStep={this.props.nextStep}
                        classTime={this.props.classTime}
                        onSelectClassTimeHandler={this.onSelectClassTimeHandler.bind(this)}
                        cancelClassTimeHandler={this.cancelClassTimeHandler.bind(this)}/>
                    {this.props.isConfirming?
                        <Confirmation 
                            teacherName={this.state.teacherName}
                            classTime={this.state.classTime}
                            confirmReservation={this.confirmReservation.bind(this)}
                            cancelReservation={this.cancelReservation.bind(this)}/>: null}
                </div>
            )
    //     } else if (this.props.step === 'finished'){
    //         return (
    //             <div className={classes.App}>
    //                 <div style={{ textAlign: 'center' }}>
    //                     <h3>已完成預約！</h3>
    //                 </div>
    //             </div>
    //         )
    //     }
    }
}

const mapStateToProps = state => {
    return {
        chineseName: state.chineseName,
        engName: state.engName,
        teacherName: state.teacherName,
        step: state.step,
        year: state.year,
        month: state.month,
        date: state.date,
        classTime: state.classTime,
        isConfirming: state.isConfirming
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeHandler: (e, language_of_name) => dispatch(actions.onChangeHandler(e, language_of_name)),
        onSelectTeacherHandler: (teacherName) => dispatch(actions.onSelectTeacherHandler(teacherName)),
        nextStep: () => dispatch(actions.nextStep()),
        prevStep: () => dispatch(actions.prevStep()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
