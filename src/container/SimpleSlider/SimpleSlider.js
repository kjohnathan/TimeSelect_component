import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import * as actions from '../../store/action/actions';

import classes from './SimpleSlider.module.scss';

import { masterGrpList } from './masterGrp/index';

class SimpleSlider extends Component {
    state = {
        currentSlideIndex: 0,
        onSelectDate: '',
        dateListArr: [],
        newDateListArrLength: 0,
        dateTimeList: null
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

        console.log(masterGrpList[this.props.masterGid - 1]);
        const intializeTimeList = () => {
            const year_string = `${currentDateObject.getFullYear()}`;
            const month_string = (
                currentDateObject.getMonth() + 1> 10?
                `${currentDateObject.getMonth() + 1}`: '0' + `${currentDateObject.getMonth() + 1}`
            )
            const date_string = (
                currentDateObject.getDate() > 10?
                `${currentDateObject.getDate()}`: '0' + `${currentDateObject.getDate()}`
            )

            const datetime_string = year_string + month_string + date_string;
            const onSelectDateTime = masterGrpList[this.props.masterGid-1].datetime.find((date) => {
                return date.date === datetime_string;
            })
            console.log(onSelectDateTime);

            if(onSelectDateTime){
                return onSelectDateTime.time_list;
            } else {
                return null;
            }
        }

        console.log(intializeTimeList());
        this.props.setSelectedDate_timeList(intializeTimeList());
    }

    componentDidUpdate(prevState){
        console.log('componentDidUpdate, currentSlideIndex =', this.state.currentSlideIndex)
        console.log('componentDidUPdate', this.state.onSelectDate);

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

    selectDateHandler = (seletedDate) => {
        this.setState({
            onSelectDate: seletedDate
        })
        
        this.props.setDateTimeString(seletedDate);

        const intializeTimeList = () => {
            const year_string = `${seletedDate.getFullYear()}`;
            const month_string = (
                seletedDate.getMonth() + 1> 10?
                `${seletedDate.getMonth() + 1}`: '0' + `${seletedDate.getMonth() + 1}`
            )
            const date_string = (
                seletedDate.getDate() > 10?
                `${seletedDate.getDate()}`: '0' + `${seletedDate.getDate()}`
            )

            const datetime_string = year_string + month_string + date_string;
            const onSelectDateTime = masterGrpList[this.props.masterGid-1].datetime.find((date) => {
                console.log(date.date);
                console.log(date_string);
                return date.date === datetime_string;
            })
            console.log(onSelectDateTime);

            if(onSelectDateTime){
                this.props.setSelectedDate_timeList(onSelectDateTime.time_list)
            } else {
                this.props.setSelectedDate_timeList('no free time');
            }
        }

        intializeTimeList();
    }

    render(){
        console.log(this.state.onSelectDateTime);
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