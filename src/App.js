import React, { Component } from 'react';
import classes from './App.module.scss';

import InfoPage from './components/InfoPage/InfoPage';
import TeacherSelection from './container/TeacherSelection/TeacherSelection';
import TimeSelectLayout from './Layout/TimeSelectLayout';
import Confirmation from './components/Confirmation/Cofirmation';

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
    
    onChangeHandler = (e, type) => {
        const cloned_state = {...this.state};
        cloned_state[type] = e.target.value;
        console.log(cloned_state);
        this.setState(cloned_state);
    }

    onSelectTeacherHandler = (teacherName) => {
        const cloned_state = {...this.state};
        
        cloned_state.teacherName = teacherName;
        console.log(cloned_state);
        this.setState(cloned_state);
    }

    nextStep = (e) => {
        e.preventDefault();
        switch(this.state.step){
            case 'info_page':
                if (this.state.chineseName !== '' && this.state.engName !== ''){
                    this.setState({
                        step: 'teacher_select'
                    })
                } else {
                    alert('請確實填寫資訊');
                }
            break;

            case 'teacher_select':
                if (this.state.teacherName !== ''){
                    this.setState({
                        step: 'time_select'
                    })
                } else {
                    alert('請選取教練')
                }
            break;

            case 'time_select':
                if (this.state.classTime !== ''){
                    this.setState({
                        isConfirming: true
                    })
                } else {
                    alert('請選取時段')
                }

            default:
                return ;
        }
    }

    prevStep = (e) => {
        e.preventDefault();
        switch(this.state.step){
            case 'teacher_select':
                this.setState({
                    step: 'info_page'
                })
            break;

            case 'time_select':
                this.setState({
                    step: 'teacher_select'
                })
            break;

            default:
                return ;
        }
    }

    popConfirmModal = (e) => {
        e.preventDefault();
        if (this.state.classTime !== ''){
            this.setState({
                isConfirming: true
            })
        } else {
            alert('請選擇時段');
        }
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
        if (this.state.step === 'info_page'){
            return (
                <div className={classes.App}>
                    <InfoPage 
                        onChangeHandler={this.onChangeHandler.bind(this)}
                        chineseName={this.state.chineseName}
                        engName={this.state.engName}
                        nextStep={this.nextStep.bind(this)}/>
                </div>
            );
        } else if (this.state.step === 'teacher_select'){
            return (
                <div className={classes.App}>
                    <TeacherSelection
                        teacherName={this.state.teacherName}
                        onSelectTeacherHandler={this.onSelectTeacherHandler.bind(this)}
                        nextStep={this.nextStep.bind(this)}
                        prevStep={this.prevStep.bind(this)}/>
                </div>
            )
        } else if (this.state.step === 'time_select'){
            return (
                <div className={classes.App}>
                    <TimeSelectLayout 
                        prevStep={this.prevStep.bind(this)}
                        popConfirmModal={this.popConfirmModal.bind(this)}
                        classTime={this.state.classTime}
                        onSelectClassTimeHandler={this.onSelectClassTimeHandler.bind(this)}
                        cancelClassTimeHandler={this.cancelClassTimeHandler.bind(this)}/>
                    {this.state.isConfirming?
                        <Confirmation 
                            teacherName={this.state.teacherName}
                            classTime={this.state.classTime}
                            confirmReservation={this.confirmReservation.bind(this)}
                            cancelReservation={this.cancelReservation.bind(this)}/>: null}
                </div>
            )
        } else if (this.state.step === 'finished'){
            return (
                <div className={classes.App}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>已完成預約！</h3>
                    </div>
                </div>
            )
        }
    }
}

export default App;
