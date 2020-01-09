import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';
import Loading from '../../UI/Loading/Loading';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/spinner';
import Aux from '../../hoc/aux';

import classes from './TeacherSelection.module.scss';
import selectMasterPic from './selectMaster.png';
import { encode } from 'punycode';

class teachderSelection extends Component {
    constructor(props){
        super(props);
    }

    state = {
        teachersList: [],
        isLoading: false,
        picLoaded: false
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
            console.log(data);

            this.setState({
                teachersList: data.infos,
                isLoading: false
            })
        })
        .catch(err => console.log(err));

        console.log('mounted');
    }

    onLoadHandler = () => {
        console.log('loaded');
        this.setState({
            picLoaded: true
        })
    }

    onLoadErrorHandler = () => {
        console.log('error');
        this.setState({
            picLoaded: true
        })
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

        let pageContent = (
            <Aux>
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
            </Aux>
        )

        // '/static/appointment/media/selectMaster.png'
        return (
            <div className={classes.TeacherSelectionPage}>
                <img 
                    onLoad={this.onLoadHandler.bind(this)}
                    onError={() => console.log('error')}
                    className={classes.BannerImg} 
                    src='/static/appointment/media/selectMaster.png' />
                { this.state.picLoaded ? 
                    pageContent: null }
            </div>
        )
    }
}

export default teachderSelection;