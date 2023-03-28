import React, { useState } from 'react'
import logo from '../assets/logo.svg';
import InputMask from 'react-input-mask';
import './form.css';

export default function Form() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(true);
    const [isModal, setIsModal] = useState(false);

    const database = [
        {
            username: "+7 111 111 11 11",
            password: "123456"
        }
    ];
    const errors = {
        uname: "Неправильный логин",
        pass: "Неправильный пароль"
    };

    const handleClick = () => {
        setIsError(true)
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Ищем юзера
        const userData = database.find((user) => user.username === uname.value);

        // Валидируем
        if (userData) {
            if (userData.password !== pass.value) {
                // Неверный пароль
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Юзернейм не найден
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };


    const handleGoBack = () => {
        setIsSubmitted(false)
        setIsError(false)
    }

    const handleForgotPassword = () => {
        setIsModal(!isModal)
      
    }

    // Ошибки при валидации
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // Код Формы
    const renderForm = (
        <section>
            <div className="register">
                <div className="col-1">
                    <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                        <img src={logo} alt="company logo" className='logo' />

                        <InputMask type="text" name="uname" className='input' placeholder='Введите логин' mask='+7 999 999 99 99' required></InputMask>
                        {isError && renderErrorMessage("uname")}

                        <InputMask type="password" name='pass' className='input' placeholder='Введите пароль' required></InputMask>
                        {isError && renderErrorMessage("pass")}

                        <button className='forgotPass' onClick={handleForgotPassword}>Забыли пароль?</button>
                        <button className='btn' type='submit' onClick={handleClick} >ВОЙТИ</button>

                    </form>

                </div>
            </div>
        </section>
    )

    return (
        <>

            {isSubmitted ? (
                <div className='login-form'>
                    <div className="title">Ура!</div>
                    <div>
                        Вы успешно залогинились
                    </div>
                    <button className='backBtn' onClick={handleGoBack}>Выход</button>
                </div>

            )

                : renderForm}

            {isModal && (
                <div className='login-form modal'>
                    <div className="title">Забыли пароль?</div>
                    <div>
                        Ваш временный пароль: 123456
                    </div>
                    <button className='backBtn' onClick={handleForgotPassword}>Вернуться</button>
                </div>
            )

            }

        </>
    )
}
