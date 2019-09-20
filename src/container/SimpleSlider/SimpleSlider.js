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
        dateListArr: [],
        newDateListArrLength: 0,
        dateTimeList: null,
        selectedGrp_datetime: null,
    }

    componentDidMount(){
        console.log('SimpleSlider', 'componentDidMount');
        const currentDateObject = new Date();

        this.props.setDateTimeString(currentDateObject);

        const generated_date_list = [];

        const generat_date_list = (generated_date_list, currentDateObject) => {
            for (let i = 0; i < 20; i++){
                if ( i === 0 ){
                    generated_date_list.push(currentDateObject);
                    console.log('first object');
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
            console.log(dateObject);
            const datetime_string = convertToDateString(dateObject);

            const params = {
                gid: this.props.masterGid,
                day: 5,
                start_date: datetime_string
            }

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
                console.log(data.infos.datetime)
                console.log(dateObject);
                this.setState({
                    selectedGrp_datetime: data.infos.datetime
                })
                this.props.setSelectedDate_timeList(intializeTimeList(currentDateObject, data.infos.datetime));
            })
            .catch(err => console.log(err))
        }

        fetch_datetimelist(currentDateObject);
    }

    componentDidUpdate(){
        console.log('componentDidUpdate, currentSlideIndex =', this.state.currentSlideIndex)
        console.log('componentDidUPdate datimelist', this.state.se);

        if ( this.state.currentSlideIndex + 20 > this.state.dateListArr.length){
            const cloned_dateListArr = [...this.state.dateListArr];
            const last_ele_in_dateListArr = cloned_dateListArr[cloned_dateListArr.length -1];

            for (let i = 1; i <= 3; i++){
                cloned_dateListArr.push(
                    new Date(
                        last_ele_in_dateListArr.getFullYear(),
                        last_ele_in_dateListArr.getMonth(),
                        last_ele_in_dateListArr.getDate() + i
                    )
                )
            }

            this.setState({
                dateListArr: cloned_dateListArr
            })
        } else {
            return ;
        }
    }

    selectDateHandler = (selectedDate) => {
        this.setState({
            onSelectDate: selectedDate
        })
        
        this.props.setDateTimeString(selectedDate);
        
        // const intializeTimeList = (selectedDate) => {
        //     const datetime_string = convertToDateString(selectedDate);

        //     const onSelectDateTime = this.state.selectedGrp_datetime.find((date) => {
        //         return date.date === datetime_string;
        //     })
        //     console.log(onSelectDateTime);

        //     if(onSelectDateTime){
        //         this.props.setSelectedDate_timeList(onSelectDateTime.time_list)
        //     } else {
        //         this.props.setSelectedDate_timeList('no free time');
        //     }
        // }

        // intializeTimeList(selectedDate);

        console.log(this.state.onSelectDate);
        console.log(selectedDate);

        const fiveAfterOnSelectDateObject = new Date(
            this.state.onSelectDate.getFullYear(),
            this.state.onSelectDate.getMonth(),
            this.state.onSelectDate.getDate() + 5
        )

        if( selectedDate > converToDateObject(this.state.selectedGrp_datetime[4].date) || 
            selectedDate < converToDateObject(this.state.selectedGrp_datetime[0].date)){

            const datetime_string = convertToDateString(selectedDate);
            console.log('datetimeString', datetime_string);
            const params = {
                gid: this.props.masterGid,
                day: 5,
                start_date: datetime_string
            }

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
            })
            .catch(err => console.log(err));
        } else {
            this.props.setSelectedDate_timeList(intializeTimeList(selectedDate, this.state.selectedGrp_datetime));
        }
    }

    render(){
        var settings = {
            accessibility: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            swipe: false,
            adaptiveHeight: true,
            arrows: true,
            nextArrow: <CustomNextArrow />, 
            prevArrow: <CustomPrevArrow />,
            afterChange: (currentIndex) => {
                console.log(currentIndex);
                this.setState({
                    currentSlideIndex: currentIndex
                })
            },
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      initialSlide: 0
                    }
                }
            ],
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