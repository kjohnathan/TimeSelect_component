import React from 'react';

import cities from './cities';
import ages from './ages';

import classes from './InfoPage.module.scss';

const infoPage = (props) => {
    console.log(props)
    const cities_arr = Object.keys(cities);

    const cities_options = cities_arr.map((city) => (
        <option key={city}>{city}</option>
    ))

    let district_arr = null;
    let district_options = [];

    if( props.city ){
        district_arr = cities[props.city];
        district_options = district_arr.map((district) => (
            <option key={district}>{district}</option>
        ))
    }

    const ages_options = ages.map((age_range) => (
        <option key={age_range}>{age_range}</option>
    ))

    return (
        <div className={classes.FormContainer}>
            <img id={classes.welcomePic} src='/static/appointment/media/welcome.png' />
            <h2>請輸入您的姓名</h2>
            <p>※ 不可為匿名使用 <span>(必填)</span></p>
            <form className={classes.InfoForm}>
                <div className={classes.infoTitle}>
                    <label>
                        姓名
                    </label>
                    {   props.unfilled_blanks.find((ele) => { return ele === 'chineseName' }) ?
                        <p>請填入您的中文名字</p>: null
                    }
                </div>
                <input
                    required
                    autoComplete='off'
                    placeholder='請輸入您的姓名'
                    value={props.chineseName}
                    name='chineseName'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'chineseName')}/>
                <div className={classes.infoTitle}>
                    <label>
                        手機號碼
                    </label>
                    {   props.unfilled_blanks.find((ele) => { return ele === 'phoneNumber' }) ?
                        <p>請填入您的手機號碼</p>: null
                    }
                </div>
                <input
                    required
                    autoComplete='off'
                    placeholder='請輸入您的手機號碼'
                    value={props.phoneNumber}
                    name='phoneNumber'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'phoneNumber')}/>
                <div className={classes.infoTitle}>
                    <label>介紹人</label>
                </div>
                <input 
                    autoComplete='off'
                    placeholder='若無則不填'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'introducer')}/>
                <div className={classes.selectionBar}>
                    <select 
                        style={
                            props.unfilled_blanks.find((info) => {
                                return info === 'gender'
                            })?

                            {color: 'red'}:null
                        }
                        onChange={(e) => props.dropDownSelectHandler('gender', e.target.value)}
                        value={props.gender || '性別'}>
                        <option disabled>性別</option>
                        <option>男性</option>
                        <option>女性</option>
                        <option>其他</option>
                    </select>
                    <select
                        style={
                            props.unfilled_blanks.find((info) => {
                                return info === 'age'
                            })?

                            {color: 'red'}:null
                        }
                        className={classes.rightSelect}
                        onChange={(e) => props.dropDownSelectHandler('age', e.target.value)}
                        value={props.age || '年齡'}>
                        <option disabled>年齡</option>
                        {ages_options}
                    </select>
                </div>
                <div className={classes.selectionBar}>
                    <select 
                        style={
                            props.unfilled_blanks.find((info) => {
                                return info === 'city'
                            })?

                            {color: 'red'}:null
                        }
                        onChange={(e) => props.dropDownSelectHandler('city', e.target.value)} 
                        value={props.city || '城市'}>
                        <option disabled>城市</option>
                        {cities_options}
                    </select>
                    <select
                        style={
                            props.unfilled_blanks.find((info) => {
                                return info === 'district'
                            })?

                            {color: 'red'}:null
                        }                    
                        className={classes.rightSelect}
                        onChange={(e) => props.dropDownSelectHandler('district', e.target.value)} 
                        value={props.district || '區、鎮、鄉'}
                        defaultValue="區、鎮、鄉">
                        <option disabled value='區、鎮、鄉'>區、鎮、鄉</option>
                        {district_options}
                    </select>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        props.nextStep();
                    }}>        
                    下一步
                </button>

            </form>

        </div>
    )
}

export default infoPage;