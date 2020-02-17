import React, { Component } from 'react';

import TeacherDiv from '../../components/TeacherDiv/TeacherDiv';
import Loading from '../../UI/Loading/Loading';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/spinner';
import Aux from '../../hoc/aux';

import classes from './TeacherSelection.module.scss';
import selectMasterPic from './selectMaster.jpg';
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

            this.setState({
                teachersList: data.infos,
                isLoading: false
            })
        })
        .catch(err => console.log(err));
    };

    onLoadHandler = () => {
        this.setState({
            picLoaded: true
        })
    }

    onLoadErrorHandler = () => {
        this.setState({
            picLoaded: true
        });
    }

    render(){
        let teacherDivs = [];
    
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

        return (
            <div className={classes.TeacherSelectionPage}>
                <img 
                    onLoad={this.onLoadHandler.bind(this)}
                    onError={() => console.log('error')}
                    className={classes.BannerImg} 
                    src='/static/appointment/media/selectMaster.jpg' 
                    // src={selectMasterPic || '/static/appointment/media/selectMaster.png' }
                />
                { this.state.picLoaded ? 
                    pageContent: null }
            </div>
        )
    }
}

export default teachderSelection;