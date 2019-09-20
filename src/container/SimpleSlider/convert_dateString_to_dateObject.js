const convert_dateString_to_dateObject = (dateString, counter) => {
        console.log(dateString);
        const year = Number(dateString.slice(0, 4));
        const month = Number(dateString.slice(4, 6));
        const date = Number(dateString.slice(6, 8));
    
        if(counter && typeof(counter) === 'number'){
            return new Date(year, month - 1, date + counter);
        } else {
            return new Date(year, month, date + counter)
        }
}

export default convert_dateString_to_dateObject;