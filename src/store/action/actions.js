import * as actionTypes from './actionTypes';

export const setInfoContent = (infoType, updatedValue) => {
    return {
        type: actionTypes.SET_INFO_CONTENT,
        infoType: infoType,
        updatedValue: updatedValue
    }
}

export const onChangeHandler = (e, language_of_name) => {
    return {
        type: actionTypes.CHANGE_NAME,
        language_of_name: language_of_name,
        updatedValue: e.target.value,
        event: e
    }
}

export const onSelectMasterGroup = (masterGid) => {
    return {
        type: actionTypes.SELECT_MASTER_GROUP,
        masterGid: masterGid
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

export const setDateTimeString = (datetime_string) => {
    return {
        type: actionTypes.SET_DATE_TIME_STRING,
        datetime_string: datetime_string
    }
}

export const setSelectedDate_timeList = (timeList) => {
    return {
        type: actionTypes.SET_SELECTED_DATE_TIME_LIST,
        timeList: timeList
    }
}

export const setErrorMsg = ( errMsg ) => {
    return {
        type: actionTypes.SET_ERROR_MSG,
        errMsg: errMsg
    }
}