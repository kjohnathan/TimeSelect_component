import * as actionTypes from '../action/actionTypes';

const initialState = {
    chineseName: '',
    engName: '',
    teacherName: '',
    step: 'info_page',
    year: '',
    month: '',
    date: '',
    classTime: '',
    isConfirming: false
}

const reducer = ( state = initialState , action ) => {
    switch(action.type){
        case actionTypes.CHANGE_NAME:
            if (action.language_of_name === 'chineseName'){
                return {
                    ...state,
                    chineseName: action.updatedValue
                }
            } else if (action.language_of_name === 'engName'){
                return {
                    ...state,
                    engName: action.updatedValue
                }
            } else {
                return state;
            }
        break;
        
        case actionTypes.SELECT_TEACHER:
            return {
                ...state,
                teacherName: action.teacherName,
                step: 'time_select'
            }
        break;

        case actionTypes.NEXT_STEP:
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

        case actionTypes.SELECT_TIME:
            return {
                ...state,
                
            }

        default:
            return state;
    }
}

export default reducer;