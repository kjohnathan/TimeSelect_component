import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import * as actions from '../../store/action/actions';

import classes from './SimpleSlider.module.scss';

class SimpleSlider extends Component {
    state = {
        currentSlideIndex: 0,
        onSelectDate: '',
        dateListArr: [],
        newDateListArrLength: 0,
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
        console.log(this.state.currentSlideIndex);
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
                    setCurrentIndex={
                        this.slider.slickGoTo}
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

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setInitialDate: (currentDate) => dispatch(actions.setInitialState(currentDate)),
        onSelectTimeHandler: (selectedDate) => dispatch(actions.selectTime(selectedDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider);