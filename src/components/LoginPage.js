import React, { useState } from 'react'
import { database, errors } from './data.js'
import Form from './Form'
import './loginPage.css';

export default function LoginPage() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(true);
    const [isModal, setIsModal] = useState(false);


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

    const handleClick = () => {
        setIsError(true)
    }

    const handleGoBack = () => {
        setIsSubmitted(false)
        setIsError(false)
    }

    const handleForgotPassword = () => {
        setIsModal(!isModal)

    }

    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13) {

            handleClick()
            handleSubmit(event)
        }
    }

    // Ошибки при валидации
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );



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

                : <Form handleSubmit={handleSubmit}
                    handleOnKeyDown={handleOnKeyDown}
                    isError={isError}
                    renderErrorMessage={renderErrorMessage}
                    handleForgotPassword={handleForgotPassword}
                    handleClick={handleClick} />}

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
