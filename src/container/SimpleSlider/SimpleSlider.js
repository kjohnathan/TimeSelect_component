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
        const currentDateObject = new Date();

        this.props.setDateTimeString(currentDateObject);

        const generated_date_list = [];

        const generat_date_list = (generated_date_list, currentDateObject) => {
            for (let i = 0; i < 20; i++){
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
                })
                this.props.setSelectedDate_timeList(intializeTimeList(currentDateObject, data.infos.datetime));
            })
            .catch(err => console.log(err))
        }

        fetch_datetimelist(currentDateObject);
    }

    componentDidUpdate(){
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