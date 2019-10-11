import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';
import Loading from '../../UI/Loading/Loading';

import classes from './TeacherSelection.module.scss';

class teachderSelection extends Component {
    constructor(props){
        super(props);
    }

    state = {
        teachersList: [],
        isLoading: false
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        fetch('https://hsintian.tk/api/group/get/ ', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.info);
            this.setState({
            teachersList: data.infos,
            isLoading: false
        })})
        .catch(err => console.log(err));

        console.log('mounted');
    }

    render(){
        let teacherDivs = [];
        console.log(this.props);
        console.log(this.state);
    
        if (this.state.teachersList.length !== 0){
            this.state.teachersList.forEach((masterGrp, index) => {
                teacherDivs.push(
                    <TeacherDiv
                        key={masterGrp.group}
                        imgSrc={masterGrp.image}
                        groupName={masterGrp.group}
                        masterGid={index+1}
                        teacherIntro={masterGrp.descript}
                        onSelectMasterGroup={this.props.onSelectMasterGroup}
                    />
                )
            })
        }

        return (
            <div className={classes.TeacherSelectionPage}>
                <img id={classes.selectMasterPic} src='/static/appointment/media/selectMaster.png' />
                <div>
                    <button
                        className={classes.PrevStepButton}
                        onClick={this.props.prevStep}>
                        上一步
                    </button>
                    <h2>請選擇老師</h2>
                    <div id={classes.spaceDiv}></div>
                </div>
                {this.state.isLoading?
                    <Loading />: 
                    teacherDivs
                }
            </div>
        )
    }
}

export default teachderSelection;