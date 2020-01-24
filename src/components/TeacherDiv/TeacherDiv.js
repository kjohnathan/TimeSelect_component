import React from 'react';

import classes from './TeacherDiv.module.scss';

const teacherDiv = (props) => {

    const lineBreak = (script) => {
        const script_arr = script.split('\r\n');
        console.log(script_arr);
        return script_arr;
    }

    const intro_li = lineBreak(props.teacherIntro).map((intro) => {
        return (
            <li>{intro}</li>
        )
    });

    return (
        <div 
            className={classes.TeacherDiv}
            onClick={() => props.onSelectMasterGroup(props.masterGid, props.groupName)}>
            <img className={classes.TeacherImg} src={'https://hsintian.tk/static/images/' + props.imgSrc} alt={`${props.imgSrc}`}/>
            <div className={classes.TeacherInfo}>
                <ol className={classes.TeacherIntroContent} type='A'>
                    {/* {props.teacherIntro} */}
                    {intro_li}
                </ol>
            </div>
        </div>
    )
}

export default teacherDiv;