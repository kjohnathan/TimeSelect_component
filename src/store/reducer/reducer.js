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
            console.log(action.updatedValue);
            console.log(action.language_of_name);
            console.log(action.type);
            console.log(action.event);
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
                teacherName: action.teacherName
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

            } else if (state.step === 'teacher_select'){
                if (state.teacherName !== ''){
                    return {
                        ...state,
                        step: 'time_select'
                    }
                } else {
                    alert('請選取教練');
                    return state;
                }
            } else if (state.step === 'time_select'){
                if (state.classTime !== ''){
                    console.log('要確認');
                    return {
                        ...state,
                        isConfirming: true
                    }
                } else {
                    alert('請選取時段');
                    return state;
                }
            } else {
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

        default:
            return state;
    }
}

export default reducer;