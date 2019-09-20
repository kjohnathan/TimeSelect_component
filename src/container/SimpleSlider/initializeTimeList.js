import convert_dateObject_to_dateString from './convert_dateObject_to_dateString';

const initializeTimeList = ( dateObject, dateTimeList ) => {
    console.log(dateObject);
    console.log('date',dateTimeList);
    const datetime_string = convert_dateObject_to_dateString(dateObject);

    const onSelectDateTime = dateTimeList.find((date) => {
        return date.date === datetime_string;
    })

    console.log('initilaTimeList',onSelectDateTime);
    if(onSelectDateTime){
        return onSelectDateTime.time_list;
    } else {
        return 'no free time';
    }   
}

export default initializeTimeList;