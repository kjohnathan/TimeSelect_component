import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';
import Loading from '../../UI/Loading/Loading';
import Button from '../../UI/Button/Button';

import classes from './TeacherSelection.module.scss';
import selectMasterPic from './selectMaster.png';

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
            const sortedDate = data.infos.sort((a, b) => {
                const orderNumber_a = Number(a.group.match(/(\d+)/)[0]);
                const orderNumber_b = Number(b.group.match(/(\d+)/)[0]);

                return orderNumber_a - orderNumber_b;
            })

            this.setState({
            teachersList: sortedDate,
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
                        masterGid={masterGrp.id}
                        teacherIntro={masterGrp.descript}
                        onSelectMasterGroup={this.props.onSelectMasterGroup}
                    />
                )
            })
        }

        return (
            <div className={classes.TeacherSelectionPage}>
                <img className={classes.BannerImg} src='/static/appointment/media/selectMaster.png' />
                <div className={classes.ButtonContainer}>
                    <Button
                            className={classes.PrevStepButton}
                            onClickHandler={this.props.prevStep}>
                            上一步
                    </Button>
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