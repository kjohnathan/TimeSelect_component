import React from 'react';

import classes from './TeacherDiv.module.scss';

const teacherDiv = (props) => {
    console.log(props.imgSrc);
    console.log('https://hsintian.tk/static/profile_pic/' + props.imgSrc);

    const lineBreak = (script) => {
        script.replace('\r\n', '\n')
        return script;
    }

    return (
        <div 
            className={classes.TeacherDiv}
            onClick={() => props.onSelectMasterGroup(props.masterGid)}>
            <img className={classes.TeacherImg} src={'https://hsintian.tk/static/profile_pic/' + props.imgSrc} alt={`${props.imgSrc}`}/>
            <div className={classes.TeacherInfo}>
                <h2>{props.groupName}</h2>
                <p>{props.teacherIntro}</p>
            </div>
        </div>
    )
}

export default teacherDiv;