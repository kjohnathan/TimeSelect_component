import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import classes from './MonthSlider.module.scss';

class monthSlider extends Component {
    constructor(props){
        super(props);
    }

    state = {
        monthsList: []
    }

    componentDidMount(){
        const monthsList = []

        if ( this.props.currentDate_object ){
            for ( let i = 0; i < 20; i++){
                const date_object = new Date(
                    this.props.currentDate_object.getFullYear(),
                    this.props.currentDate_object.getMonth() + i,
                    1
                )
                
                monthsList.push(date_object)
            }

            this.setState({ monthsList });
        }
    }

    render(){
        const settings = {
            accessibility: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: true,
            adaptiveHeight: true,
            arrows: true,
            nextArrow: <CustomNextArrow />,     
            prevArrow: <CustomPrevArrow />,
            afterChange: (index) => {
                console.log(this.state.monthsList[index]);
                this.props.selectMonth(this.state.monthsList[index]);
            }
        }

        let monthSlides = [];

        if ( this.state.monthsList.length ){
            monthSlides = this.state.monthsList.map((dateObject) => {
                return (
                    <div>{dateObject.getMonth() + 1}月</div>
                )
            })
        }

        return (
            <div className={classes.MonthSlider}>
                <Slider {...settings}>
                    {monthSlides}
                </Slider>
            </div>
        )
    }
}

export default monthSlider;