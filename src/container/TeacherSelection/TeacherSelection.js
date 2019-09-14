import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';

import classes from './TeacherSelection.module.scss';

class teachderSelection extends Component {
    constructor(props){
        super(props);
    }

    state = {
        teachersList: []
    }

    componentDidMount(){
        fetch('http://hsintian.tk:8000/api/group/get/', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
            teachersList: data.infos
        })})
        .catch(err => console.log(err));
    }

    render(){
        let teacherDivs = [];
        console.log(this.props);
        console.log(this.state);
        if (this.state.teachersList.length !== 0){
            this.state.teachersList.forEach((masterGrp, index) => {
                // if (teacher.masterGid === this.props.masterGid){
                //     teacherDivs.push(
                //         <TeacherDiv
                //             key={teacher.teacherName}
                //             imgSrc={teacher.imgSrc}
                //             teacherName={teacher.teacherName}
                //             masterGid={teacher.masterGid}
                //             teacherIntro={teacher.teacherIntro}
                //             onSelectMasterGroup={this.props.onSelectMasterGroup}
                //             selected={true}
                //         />
                //     )
                // } 
                // else {
                    teacherDivs.push(
                        <TeacherDiv
                            key={masterGrp.group}
                            imgSrc={masterGrp.imgSrc}
                            groupName={masterGrp.group}
                            masterGid={index+1}
                            teacherIntro={masterGrp.descript}
                            onSelectMasterGroup={this.props.onSelectMasterGroup}
                        />
                    )
                // }
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