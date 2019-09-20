const convert_dateObject_to_dateString = (dateObject) => {
    console.log(dateObject);
    console.log(dateObject.getFullYear());
    console.log(dateObject.getMonth() + 1);
    console.log(Boolean(dateObject.getMonth() + 1 > 10));
    const year_string = `${dateObject.getFullYear()}`;

    const month_string = (
        dateObject.getMonth() + 1 >= 10?
        `${dateObject.getMonth() + 1}`: '0' + `${dateObject.getMonth() + 1}`
    )

    const date_string = (
        dateObject.getDate() >= 10?
        `${dateObject.getDate()}`: '0' + `${dateObject.getDate() + 1}`
    )

    const datetime_string = year_string + month_string + date_string;

    return datetime_string;
}

export default convert_dateObject_to_dateString;