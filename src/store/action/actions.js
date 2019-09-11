import * as actionTypes from './actionTypes';

export const onChangeHandler = (e, language_of_name) => {
    return {
        type: actionTypes.CHANGE_NAME,
        language_of_name: language_of_name,
        updatedValue: e.target.value,
        event: e
    }
}

export const onSelectTeacherHandler = (teacherName) => {
    return {
        type: actionTypes.SELECT_TEACHER,
        teacherName: teacherName
    }
}

export const nextStep = () => {
    return {
        type: actionTypes.NEXT_STEP,
    }
}

export const prevStep = () => {
    return {
        type: actionTypes.PREV_STEP
    }
}

export const setInitialState = (currentDate) => {
    return {
        type: actionTypes.SET_INITIAL_DATE,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate()
    }
}

export const selectTime = (seletedDate) => {
    return {
        type: actionTypes.SELECT_TIME,
        year: seletedDate.getFullYear(),
        month: seletedDate.getMonth() + 1,
        date: seletedDate.getDate()
    }
}