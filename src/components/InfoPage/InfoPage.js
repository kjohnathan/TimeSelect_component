import React from 'react';

import classes from './InfoPage.module.scss';

const infoPage = (props) => {
    return (
        <div className={classes.FormContainer}>
            <h2>請輸入您的姓名</h2>
            <p>※ 不可為匿名使用 <span>(必填)</span></p>
            <form className={classes.InfoForm}>
                <label>
                    中文名字
                </label>
                <input
                    autoComplete='off'
                    required
                    placeholder='請輸入您的中文名字'
                    value={props.chineseName}
                    name='chineseName'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'chineseName')}/>
                <label>
                    英文名字
                </label>
                <input
                    autoComplete='off'
                    required
                    placeholder='請輸入您的英文名字' 
                    value={props.engName}
                    name='engName'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'engName')}/>
                <button
                    onClick={props.nextStep}>
                    下一步
                </button>
            </form>

        </div>
    )
}

export default infoPage;