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
        const teacher_list = [
            { 
                imgSrc: 'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2017/03/27/20170327-113231_U7418_M261922_9159.GIF?itok=SyEQvDBT',
                teacherName: '周子瑜',
                teacherIntro: '南韓女子音樂組合twice成員',
            }, 
            {
                imgSrc: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/%E6%B3%AB%E9%9B%85-1565166529.png?crop=0.498xw:0.997xh;0,0.00321xh&resize=640:*',
                teacherName: 'Hyuna',
                teacherIntro: '曾為韓國女團4minute成員，現為P NATION旗下韓國女藝人、歌手與舞者'
            },
            {
                imgSrc: 'https://s1.r29static.com//bin/entry/520/720x864,85/2121135/image.webp',
                teacherName: 'Beyonce',
                teacherIntro: '美國歌手、詞曲作家、音樂製作人、舞者與演員'
            },
            {
                imgSrc: 'https://akns-images.eonline.com/eol_images/Entire_Site/20171119/rs_1024x576-171219083111-1024.eminem.121917.jpg?fit=inside|900:auto&output-quality=90',
                teacherName: 'Emimem',
                teacherIntro: '是一位美國著名饒舌歌手、詞曲作家、唱片製作人、演員及電影製作人'
            },
            {
                imgSrc: 'https://yt3.ggpht.com/a/AGF-l7_WkQqGTL_xIsc1fCFiOv3OhQ0zaVZzgo8MuA=s900-c-k-c0xffffffff-no-rj-mo',
                teacherName: 'Snoop Dogg',
                teacherIntro: '是一位獲葛萊美獎提名的美國饒舌歌手、唱片製作人、演員'
            }
        ]

        this.setState({
            teachersList: teacher_list
        })
    }

    render(){
        let teacherDivs = [];
        console.log(this.props);
        if (this.state.teachersList.length !== 0){
            this.state.teachersList.forEach((teacher) => {
                if (teacher.teacherName === this.props.teacherName){
                    teacherDivs.push(
                        <TeacherDiv
                        imgSrc={teacher.imgSrc}
                        teacherName={teacher.teacherName}
                        teacherIntro={teacher.teacherIntro}
                        onSelectTeacherHandler={this.props.onSelectTeacherHandler}
                        selected={true}
                        />
                    )
                } else {
                    teacherDivs.push(
                        <TeacherDiv
                            imgSrc={teacher.imgSrc}
                            teacherName={teacher.teacherName}
                            teacherIntro={teacher.teacherIntro}
                            onSelectTeacherHandler={this.props.onSelectTeacherHandler}
                            selected={false}
                            />
                    )
                }
            })
        }

        return (
            <div className={classes.TeacherSelectionPage}>
                <h3>請選擇老師</h3>
                {teacherDivs}
                <button
                    className={classes.PrevStepButton}
                    onClick={this.props.prevStep}>上一步</button>
                <button
                    className={classes.NextStepButton}
                    onClick={this.props.nextStep}>下一步</button>
            </div>
        )
    }
}

export default teachderSelection;