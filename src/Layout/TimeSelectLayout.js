import React, { Component } from 'react';

import MonthSlider from '../container/MonthSlider/MonthSlider';
import SimpleSlider from '../container/SimpleSlider/SimpleSlider';
import TimeSelection from '../container/TimeSelection/TimeSelection';
import Spinner from '../UI/Spinner/spinner';
import BackDrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';
import Aux from '../hoc/aux';

import convertToDateString from '../container/SimpleSlider/convert_dateObject_to_dateString';
import converToDateObject from '../container/SimpleSlider/convert_dateString_to_dateObject';

import classes from './TimeSelectLayout.module.scss';

class TimeSelectLayout extends Component {
    constructor(props){
        super(props);
    }

    state = {
        selectedDate_object: new Date(),
        timedata: [],
        monthList: '',
        dateList: [],
        selectedMonth: '',
        selectedDate: '',
        timeList: '',
        datetime_object: {}
    }

    selectMonthHandler = (month) => {
        console.log(month);

        const dateList = this.state.datetime_object[month].map((date) => {
            return converToDateObject(date.date);
        })

        console.log(dateList);
        console.log(this.state.datetime_object[month][0].time_list);

        this.setState({
            selectedMonth: month,
            dateList,
            selectedDate: dateList[0],
            timeList: this.state.datetime_object[month][0].time_list
        });
    };

    selectDateHandler = (date, index) => {
        if (date === this.state.selectedDate){
            return ;
        };

        const datetime_string = convertToDateString(date);

        const targetDate = this.state.timedata.infos.datetime.find((date) => {
            return date.date === datetime_string;
        });


        this.setState({
            selectedDate: date,
            timeList: targetDate.time_list
        })

        this.props.setDateTimeString(date);
    }

    componentDidMount(){
        const fetch_timedata = () => {
            const datetime_string = convertToDateString(new Date());

            const params = {
                gid: this.props.masterGid,
                day: 60,
                start_date: datetime_string
            }

            console.log(params);

            let esc = encodeURIComponent;
            const queryString = Object.keys(params)
                                    .map((ele) => esc(ele) + '=' + esc(params[ele])).join('&');
            
                                
            fetch('https://hsintian.tk/api/freetime/get/?' + queryString, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const firstDate = converToDateObject(data.infos.datetime[0].date);
                console.log(firstDate.getMonth() + 1);

                const datetime_object = new Object();
                
                data.infos.datetime.forEach((date) => {
                    const dateObject = converToDateObject(date.date);
                    const month_of_date = dateObject.getMonth() + 1;
                    
                    if (!datetime_object[month_of_date]){
                        datetime_object[month_of_date] = [];

                        if (date.time_list.length){
                            datetime_object[month_of_date].push(date);
                        }
                    } else {
                        if (date.time_list.length){
                            datetime_object[month_of_date].push(date);
                        }
                    }
                });

                console.log(datetime_object);

                const monthList = [];
                for (let key in datetime_object){
                    monthList.push(key);
                }

                console.log(monthList);
                console.log(datetime_object[monthList[0]][0].date);
                // const dateList = [...datetime_object[monthList[0]]];
                // const dateList = [];
                // data.infos.datetime.forEach((date) => {
                //     const dateObject = converToDateObject(date.date);
                //     if ((dateObject.getMonth() + 1) === (converToDateObject(data.infos.datetime[0].date).getMonth() + 1)){
                //         if (date.time_list.length){
                //             dateList.push(dateObject);
                //             console.log(dateObject);
                //         }
                //         console.log(date);
                //     }
                // });
                const dateList = datetime_object[monthList[0]].map((date) => {
                    return converToDateObject(date.date);
                });

                console.log(dateList);

                this.setState({
                    timedata: data,
                    monthList,
                    selectedMonth: monthList[0],
                    selectedDate: converToDateObject(datetime_object[monthList[0]][0].date),
                    dateList,
                    timeList: data.infos.datetime[0].time_list,
                    datetime_object
                });

                this.props.setDateTimeString(converToDateObject(data.infos.datetime[0].date));
            })
            .catch(err => console.log(err))
        };

        fetch_timedata();
    };

    componentDidUpdate(prevState){
        console.log(this.state);
    }
    
    render(){
        console.log(this.props);
        return (
            <div className={classes.timeSelectLayout}>
                {
                    this.props.isPending?
                    (
                        <Aux>
                            <BackDrop />
                            <Spinner />
                        </Aux>
                    ): null
                }

                <div className={classes.TitleBar}>
                    <div className={classes.ButtonContainer}>
                        <Button
                            onClickHandler={this.props.prevStep}>
                            上一步
                        </Button>
                    </div>
                    <div>
                        <h2 id={classes.timeSelectTitle}>請選擇時間</h2>
                    </div>
                </div>
                <div className={classes.YearAndMonthBar}>
                    <h2 className={classes.YearBar}>
                        { this.state.selectedDate_object ?
                            `${this.state.selectedDate_object.getFullYear()}` + '年':
                            null
                        }
                    </h2>
                    <MonthSlider 
                        monthList={this.state.monthList}
                        // currentDate_object={this.state.currentDate_object} 
                        selectMonthHandler={this.selectMonthHandler.bind(this)}/>
                </div>
                <div className={classes.DateSliderContainer}>
                    <SimpleSlider 
                        dateList={this.state.dateList}
                        selectedDate={this.state.selectedDate}
                        selectDateHandler={this.selectDateHandler.bind(this)}/>
                    {/* <SimpleSlider 
                        currentDate_object={this.state.currentDate_object}
                        selectedDate_object={this.state.selectedDate_object}
                        setDateTimeString={this.props.setDateTimeString}
                        setSeletedDateTimeListHandler={this.props.setSeletedDateTimeListHandler}
                        masterGid={this.props.masterGid}
                        setSelectedDate_timeList={this.props.setSelectedDate_timeList}
                        fetchTime={this.props.fetchTime}/> */}
                </div>
                <TimeSelection
                    // selectedDate={this.state.selectedDate}
                    // isFetchingTime={this.props.isFetchingTime}
                    // datetime_string={this.props.datetime_string}
                    selectedDate_timeList={this.state.timeList}
                    no_res={!this.state.dateList.length}
                    // onSelectClassTimeHandler={this.props.onSelectClassTimeHandler}
                    makeReservation={this.props.makeReservation}
                />
            </div>
        )
    }
}

export default TimeSelectLayout;