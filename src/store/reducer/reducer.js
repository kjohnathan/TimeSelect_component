import * as actionTypes from '../action/actionTypes';

const initialState = {
    chineseName: '',
    phoneNumber: '',
    masterId: '',
    masterGid: null,
    step: 'info_page',
    selectedDate_timeList: null,
    datetime_string: null,
    line_id: null,
    line_data_status: null,
    errMsg: null
}

const reducer = ( state = initialState , action ) => {
    switch(action.type){
        case actionTypes.SET_INFO_CONTENT: 
            console.log(action.infoType);
            console.log(action.updatedValue);
            const cloned_state = { ... state };
            cloned_state[action.infoType] = action.updatedValue;
            console.log(cloned_state);
            return cloned_state;

        case actionTypes.CHANGE_NAME:
            if (action.language_of_name === 'chineseName'){
                return {
                    ...state,
                    chineseName: action.updatedValue
                }
            } else if (action.language_of_name === 'phoneNumber'){
                return {
                    ...state,
                    phoneNumber: action.updatedValue
                }
            } 
            else {
                return state;
            }
        break;
        
        case actionTypes.SELECT_MASTER_GROUP:
            return {
                ...state,
                masterGid: action.masterGid,
                step: 'time_select'
            }
        break;

        case actionTypes.NEXT_STEP:
            if (state.step === 'info_page'){
                if (state.chineseName !== '' && state.engName !== ''){
                    return {
                        ...state,
                        step: 'teacher_select'
                    }
                } else {
                    console.log('請確實填寫姓名');
                    alert('請確實填寫資訊!!');
                    return state;
                }
            } else {
                return {
                    ...state,
                    step: 'finished'
                }
            }


        case actionTypes.PREV_STEP:
            if (state.step === 'teacher_select'){
                return {
                    ...state,
                    step: 'info_page',
                    teacherName: ''
                }
            } else if (state.step === 'time_select'){
                return {
                    ...state,
                    step: 'teacher_select',
                    classTime: ''
                }
            } else {
                return state;
            }
        break;

        case actionTypes.SET_INITIAL_DATE:
            return {
                ...state,
                year: action.year,
                month: action.month,
                date: action.date
            }
        break;

        case actionTypes.SET_DATE_TIME_STRING:
            return {
                ...state,
                datetime_string: action.datetime_string
            }

        case actionTypes.SET_SELECTED_DATE_TIME_LIST:
            return {
                ...state,
                selectedDate_timeList: action.timeList
            }

        case actionTypes.SET_ERROR_MSG: 
            return {
                ...state,
                errMsg: action.errMsg
            }

        default:
            return state;
    }
}

export default reducer;