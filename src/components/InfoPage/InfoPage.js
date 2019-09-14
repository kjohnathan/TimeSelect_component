import React from 'react';

import classes from './InfoPage.module.scss';

const infoPage = (props) => {
    return (
        <div className={classes.FormContainer}>
            <h2>請輸入您的姓名</h2>
            <p>※ 不可為匿名使用 <span>(必填)</span></p>
            <form className={classes.InfoForm}>
                <label>
                    姓名
                </label>
                <input
                    autoComplete='off'
                    required
                    placeholder='請輸入您的姓名'
                    value={props.chineseName}
                    name='chineseName'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'chineseName')}/>
                <label>
                    手機號碼
                </label>
                <input
                    autoComplete='off'
                    required
                    placeholder='請輸入您的手機號碼'
                    value={props.phoneNumber}
                    name='phoneNumber'
                    className={classes.InfoInput}
                    onChange={(e) => props.onChangeHandler(e, 'phoneNumber')}/>
                <button
                    onClick={props.nextStep}>
                    下一步
                </button>

            </form>

        </div>
    )
}

export default infoPage;