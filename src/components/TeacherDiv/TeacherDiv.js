import React from 'react';

import classes from './TeacherDiv.module.scss';

const teacherDiv = (props) => {
    // if (props.selected === true){
    //     return (
    //         <div 
    //             className={classes.TeacherDiv}
    //             onClick={() => props.onSelectMasterGroup(props.masterGid)}>
    //             <img className={classes.TeacherImg} src={props.imgSrc} alt={props.imgSrc}/>
    //             <div className={classes.SelectedTeacherInfo}>
    //                 <h2>{props.teacherName}</h2>
    //                 <p>{props.teacherIntro}</p>
    //             </div>
    //         </div>
    //     )
    // } else {
        return (
            <div 
                className={classes.TeacherDiv}
                onClick={() => props.onSelectMasterGroup(props.masterGid)}>
                <img className={classes.TeacherImg} src={props.imgSrc} alt={`${props.imgSrc}`}/>
                <div className={classes.TeacherInfo}>
                    <h2>{props.groupName}</h2>
                    <p>{props.teacherIntro}</p>
                </div>
            </div>
        )
    // }
}

export default teacherDiv;