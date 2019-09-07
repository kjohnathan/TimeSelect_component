import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CustomNextArrow from '../../components/customArrows/CustomNextArrow';
import CustomPrevArrow from '../../components/customArrows/CustomPrevArrow';
import CustomSlide from '../../components/CustomSlide/CustomSlide';

import classes from './SimpleSlider.module.scss';

class SimpleSlider extends Component {
    state = {
        currentSlide: 0,
        onSelectDate: '',
        dateListArr: []
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
        const generate_new_date_list = ( dateListArr, onSelectDate) => {
            const load_new_date = (dateListArr, onSelectDate) => {
                const currentDateIndex = dateListArr.indexOf(onSelectDate);
                console.log('componentDidUpdate', currentDateIndex);
                if (dateListArr.length < currentDateIndex + 10){
                    return (currentDateIndex + 5 - dateListArr.length);
                } else {
                    return false;
                }
            }
            const determinator = load_new_date(dateListArr, onSelectDate);

            console.log(determinator);
            
            if (determinator){
                const cloned_dateListArr = [...dateListArr];
                const last_date = cloned_dateListArr[cloned_dateListArr.length - 1];

                for (let i = 0; i < determinator; i++){
                    const next_date = new Date(
                        last_date.getFullYear(),
                        last_date.getMonth(),
                        last_date.getDate() + (i+1),
                    )
                    console.log(next_date);
                    cloned_dateListArr.push(next_date)
                }
                this.setState({
                    dateListArr: cloned_dateListArr
                })
            } else {
                return false;
            }
        }

        generate_new_date_list( this.state.dateListArr, this.state.onSelectDate)
    }

    render(){ 
        var settings = {
            accessibility: true,
            infinite: false,
            centerMode: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: true,
            focusOnSelect: true,
            nextArrow: <CustomNextArrow />,
            prevArrow: <CustomPrevArrow />,
            afterChange: (e, current) => {
                console.log(e);
                this.setState({
                    onSelectDate: this.state.dateListArr[e]
                })
            },
            resposive: [
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                }
            ]
        };

        const innerSliders = this.state.dateListArr.map((ele) => {
            return (
                <CustomSlide 
                    dateObject={ele} 
                    onSelectDate={this.state.onSelectDate}/>
            )
        })

        console.log(this.state.onSelectDate);

        return (
            <div className={classes.SliderContainer}>
            <Slider {...settings} >
                {innerSliders}
            </Slider>
            </div>
        )
    }
}

export default SimpleSlider;