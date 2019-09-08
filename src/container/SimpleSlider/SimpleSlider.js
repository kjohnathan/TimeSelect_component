import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import classes from './SimpleSlider.module.scss';

class SimpleSlider extends Component {
    state = {
        currentSlideIndex: 0,
        onSelectDate: '',
        dateListArr: [],
        newDateListArrLength: 0,
        slickGoTo: 0
    }

    componentDidMount(){
        console.log('SimpleSlider', 'componentDidMount');
        const currentDateObject = new Date();

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
        console.log(generated_date_list);
    }

    componentDidUpdate(prevState){
        console.log('componentDidUpdate, currentSlideIndex =', this.state.currentSlideIndex)

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

    selectDateHandler = (date) => {
        this.setState({
            onSelectDate: date
        })
    }

    render(){ 
        var settings = {
            accessibility: true,
            infinite: false,
            speed: 400,
            slidesToShow: 3,
            slidesToScroll: 3,
            swipe: false,
            adaptiveHeight: true,
            arrows: true,
            nextArrow: <CustomNextArrow />, 
            prevArrow: <CustomPrevArrow />,
            afterChange: (currentIndex) => {
                this.setState({
                    currentSlideIndex: currentIndex
                })
            },
            resposive: [
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      initialSlide: 2
                    }
                }
            ],
            slickGoTo: this.state.slickGoTo
        };

        const innerSliders = this.state.dateListArr.map((ele, index) => {
            return (
                <CustomSlide 
                    dateObject={ele} 
                    onSelectDate={this.state.onSelectDate}
                    slideIndex={index}
                    setCurrentIndex={
                        this.slider.slickGoTo}
                    selectDateHandler={this.selectDateHandler.bind(this)}/>
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

const mapStateToProps = state => {
    return {
        
    }
}

export default SimpleSlider;