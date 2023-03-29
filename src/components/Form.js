import React, { useState } from 'react'
import logo from '../assets/logo.svg';
import InputMask from 'react-input-mask';

const Form = ({ handleSubmit, handleOnKeyDown, isError, renderErrorMessage, handleForgotPassword, handleClick }) => {
    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                        <img src={logo} alt="company logo" className='logo' />

                        <InputMask type="text" name="uname" className='input' placeholder='Введите логин' mask='+7 999 999 99 99' required onKeyDown={(e) => handleOnKeyDown(e)} ></InputMask>
                        {isError && renderErrorMessage("uname")}

                        <InputMask type="password" name='pass' className='input' placeholder='Введите пароль' required onKeyDown={(e) => handleOnKeyDown(e)}></InputMask>
                        {isError && renderErrorMessage("pass")}

                        <button className='forgotPass' onClick={handleForgotPassword}>Забыли пароль?</button>
                        <button className='btn' type='submit' onClick={handleClick} >ВОЙТИ</button>

                    </form>

                </div>
            </div>
        </section>
    )
}

export default Form