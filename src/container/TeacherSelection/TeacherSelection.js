import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';

import { masterGidList } from './masterGrpList';

import classes from './TeacherSelection.module.scss';

class teachderSelection extends Component {
    constructor(props){
        super(props);
    }

    state = {
        teachersList: []
    }

    componentDidMount(){
        this.setState({
            teachersList: masterGidList
        })
    }

    render(){
        let teacherDivs = [];
        console.log(this.props);
        if (this.state.teachersList.length !== 0){
            this.state.teachersList.forEach((teacher) => {
                if (teacher.masterGid === this.props.masterGid){
                    teacherDivs.push(
                        <TeacherDiv
                            key={teacher.teacherName}
                            imgSrc={teacher.imgSrc}
                            teacherName={teacher.teacherName}
                            masterGid={teacher.masterGid}
                            teacherIntro={teacher.teacherIntro}
                            onSelectMasterGroup={this.props.onSelectMasterGroup}
                            selected={true}
                        />
                    )
                } else {
                    teacherDivs.push(
                        <TeacherDiv
                            key={teacher.teacherName}
                            imgSrc={teacher.imgSrc}
                            teacherName={teacher.teacherName}
                            masterGid={teacher.masterGid}
                            teacherIntro={teacher.teacherIntro}
                            onSelectMasterGroup={this.props.onSelectMasterGroup}
                            selected={false}
                        />
                    )
                }
            })
        }

        return (
            <div className={classes.TeacherSelectionPage}>
                <div>
                    <button
                        className={classes.PrevStepButton}
                        onClick={this.props.prevStep}>
                        上一步
                    </button>
                    <h2>請選擇老師</h2>
                    <div id={classes.spaceDiv}></div>
                </div>
                {teacherDivs}
            </div>
        )
    }
}

export default teachderSelection;