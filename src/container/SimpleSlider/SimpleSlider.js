import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import convertToDateString from './convert_dateObject_to_dateString';
import converToDateObject from './convert_dateString_to_dateObject';
import intializeTimeList from './initializeTimeList';

import * as actions from '../../store/action/actions';

import classes from './SimpleSlider.module.scss';


class SimpleSlider extends Component {
    state = {
        currentSlideIndex: 0,
        onSelectDate: '',
        //array of producing innerSliders
        dateListArr: [],
        newDateListArrLength: 0,
        //to store the freetimelist got from the api
        dateTimeList: null,
        selectedGrp_datetime: null,
    }

    componentDidMount(){
        console.log('simple slider componentDidMount');
        const currentDateObject = this.props.selectedDate_object;

        this.props.setDateTimeString(currentDateObject);

        const generated_date_list = [];

        const generat_date_list = (generated_date_list, currentDateObject) => {
            const lastDateInMonth = new Date(
                this.props.selectedDate_object.getFullYear(),
                this.props.selectedDate_object.getMonth() + 1,
                0
            )

            const remained_days = (
                lastDateInMonth.getDate() - this.props.selectedDate_object.getDate()
            )

            for (let i = 0; i <= remained_days; i++){
                if ( i === 0 ){
                    generated_date_list.push(currentDateObject);
                } else {
                    const next_date = new Date(
                        currentDateObject.getFullYear(),
                        currentDateObject.getMonth(),
                        currentDateObject.getDate() + i
                    )
                    generated_date_list.push(next_date);
                }
            }
            this.setState({
                onSelectDate: currentDateObject,
                dateListArr: generated_date_list,
            })
        }

        generat_date_list(generated_date_list, currentDateObject);

        const fetch_datetimelist = (dateObject) => {
            const datetime_string = convertToDateString(dateObject);

            const params = {
                gid: this.props.masterGid,
                day: 5,
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
                this.setState({
                    selectedGrp_datetime: data.infos.datetime
                });
                
                this.props.setSelectedDate_timeList(intializeTimeList(currentDateObject, data.infos.datetime));
            })
            .catch(err => console.log(err))
        }

        fetch_datetimelist(currentDateObject);
    }

    componentDidUpdate(prevProps){
        console.log('simple slider componentdidupdate');
        const checkIsCurrentMonth = (selectedDate_object) => {
            const currentDate_object = new Date();
            
            if ( currentDate_object.getFullYear() !== selectedDate_object.getFullYear() ){
                return false;
            } else if ( currentDate_object.getMonth() !== selectedDate_object.getMonth() ){
                return false;
            } else {
                return true;
            }
        }

        if ( checkIsCurrentMonth(this.props.selectedDate_object) ){
            if ( prevProps.selectedDate_object !== this.props.selectedDate_object){
                const lastDateInMonth = new Date(
                    this.props.selectedDate_object.getFullYear(),
                    this.props.selectedDate_object.getMonth() + 1,
                    0
                )

                const remained_days = (
                    lastDateInMonth.getDate() - this.props.selectedDate_object.getDate()
                )

                console.log(remained_days);

                const dateListArr = [];

                for ( let i = 0; i <= remained_days; i++ ){
                    const dateObejct = new Date(
                        this.props.selectedDate_object.getFullYear(),
                        this.props.selectedDate_object.getMonth(),
                        this.props.selectedDate_object.getDate() + i
                    )

                    dateListArr.push(dateObejct);
                }

                this.setState({ dateListArr })
                this.slider.slickGoTo(0);

                this.selectDateHandler(dateListArr[0]);
            }
        } else {
            if ( prevProps.selectedDate_object !== this.props.selectedDate_object ){
                const lastDateInMonth = new Date(
                    this.props.selectedDate_object.getFullYear(),
                    this.props.selectedDate_object.getMonth() + 1,
                    0
                )

                const daysInMonth = lastDateInMonth.getDate();

                const dateListArr = [];

                for ( let i = 0; i < daysInMonth; i++ ){
                    const dateObject = new Date(
                        this.props.selectedDate_object.getFullYear(),
                        this.props.selectedDate_object.getMonth(),
                        1 + i
                    )

                    dateListArr.push(dateObject);
                }

                this.setState({
                    dateListArr,
                    onSelectDate: dateListArr[0]
                })

                this.slider.slickGoTo(0);
                this.selectDateHandler(dateListArr[0]);
            }
        }
    }

    selectDateHandler = (selectedDate) => {
        if (selectedDate === this.state.onSelectDate){
            return;
        }

        this.setState({
            onSelectDate: selectedDate
        })

        this.props.setSelectedDate_timeList(null);
        
        this.props.setDateTimeString(selectedDate);

        console.log(converToDateObject(this.state.selectedGrp_datetime[4].date));
        console.log(this.state.selectedGrp_datetime[4].date);
        console.log(selectedDate);
        console.log(selectedDate > converToDateObject(this.state.selectedGrp_datetime[4].date));

        if( selectedDate > converToDateObject(this.state.selectedGrp_datetime[4].date) || 
            selectedDate < converToDateObject(this.state.selectedGrp_datetime[0].date)){

            const datetime_string = convertToDateString(selectedDate);
            console.log('datetimeString', datetime_string);
            const params = {
                gid: this.props.masterGid,
                day: 5,
                start_date: datetime_string
            }
            console.log(params);

            let esc = encodeURIComponent;
            const queryString = Object.keys(params)
                                    .map((ele) => esc(ele) + '=' + esc(params[ele])).join('&'); 
            
            fetch('https://hsintian.tk/api/freetime/get/?' + queryString , {
                method: 'get'
            })
            .then(res => res.json())
            .then(data => {
                    console.log('got new datetime');
                    console.log(data);
                    this.setState({
                        selectedGrp_datetime: data.infos.datetime
                    })
                this.props.setSelectedDate_timeList(intializeTimeList(selectedDate, data.infos.datetime));
                this.props.fetchTime(false);
            })
            .catch(err => console.log(err));
        } else {
            setTimeout(() => {
                this.props.setSelectedDate_timeList(intializeTimeList(selectedDate, this.state.selectedGrp_datetime));
            }, 500)
        }
    }

    render(){
        let settings = {
            accessibility: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            swipe: true,
            arrows: true,
            nextArrow: <CustomNextArrow />,     
            prevArrow: <CustomPrevArrow />,
            afterChange: (currentIndex) => {
                console.log(currentIndex);
                this.setState({
                    currentSlideIndex: currentIndex
                })
            },
            slickGoTo: this.state.slickGoTo
        };

        const innerSliders = this.state.dateListArr.map((ele, index) => {
            return (
                <CustomSlide
                    key={'sliderIndex' + index}
                    dateObject={ele} 
                    onSelectDate={this.state.onSelectDate}
                    slideIndex={index}
                    selectDateHandler={this.selectDateHandler}
                    setCurrentIndex={this.slider.slickGoTo}
                    onSelectTimeHandler={this.props.onSelectTimeHandler}/>
            )
        })

        return (
            <div className={classes.SliderContainer}>
                <Slider ref={ slider => (this.slider = slider)} {...settings} >
                    {innerSliders}
                </Slider>
            </div>                
        )
    }
}

export default SimpleSlider;