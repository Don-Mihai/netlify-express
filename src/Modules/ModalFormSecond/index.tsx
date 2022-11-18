import './ModalFormSecond.scss';
import Button from '../../components/Button';
import { useRef, useState } from 'react';
import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import {addValuesInRegisterUser} from '../../store/user/userSlice';

export interface ModalFormSecondValues {
    nextStep: any;
}

function ModalFormSecond({ nextStep }: ModalFormSecondValues) {
    const [inputsValue, setInputsValue] = useState({
        login: '',
        password: '',
        email: '',
    });

    const inputLogin: any = useRef(null);
    const inputPassword: any = useRef(null);
    const inputEmail: any = useRef(null);

    const dispatch = useAppDispatch()

    const handleChange = (event: any) => {
        setInputsValue(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleClear = (event: any) => {
        setInputsValue(prev => {
            return {
                ...prev,
                [event.target.id]: '',
            };
        });
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        //Валидация на заполнены ли поля
        if (!inputsValue.login) {
            return;
        }

        dispatch(addValuesInRegisterUser(inputsValue));
        nextStep();
    };

    return (
        <div className="sign__modal_form">
            <h2 className="sign__modal_form-title">Создайте учетную запись</h2>
            <form className="sign__modal_form-form" action="#" method="GET">
                <div className="sign__modal_form-wrapper">
                    <input className="sign__modal_form-input" ref={inputLogin} type="text" name="login" placeholder="Логин" onChange={handleChange} value={inputsValue.login} />
                    <span className="sign__modal_form-input-clear" id="login" onClick={handleClear}>
                        X
                    </span>
                </div>
                <div className="sign__modal_form-wrapper">
                    <input
                        className="sign__modal_form-input"
                        ref={inputPassword}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={inputsValue.password}
                    />
                    <span className="sign__modal_form-input-clear" id="password" onClick={handleClear}>
                        X
                    </span>
                </div>
                <div className="sign__modal_form-wrapper">
                    <input
                        className="sign__modal_form-input"
                        ref={inputEmail}
                        type="email"
                        name="email"
                        placeholder="Электронная почта"
                        onChange={handleChange}
                        value={inputsValue.email}
                    />
                    <span className="sign__modal_form-input-clear" id="email" onClick={handleClear}>
                        X
                    </span>
                </div>
                <div className="sign__modal_form-content">
                    <p className="sign__modal_form-content-text">
                        <span className="sign__modal_form-content-first">Регистрируясь, вы принимаете наши</span>
                        <a href="!#" className="sign__privacy-link">
                            Условия
                        </a>
                        <span className="sign__modal_form-content-first">,</span>
                        <a href="!#" className="sign__privacy-link">
                            Политику конфиденциальности
                        </a>
                        <span className="sign__modal_form-content-span">и</span>
                        <a href="!#" className="sign__privacy-link">
                            Политику использования файлов cookie
                        </a>
                        <span className="sign__modal_form-content-first">
                            . Twitter может использовать ваши контактные данные, в том числе адрес электронной почты и номер телефона, в целях, описанных в
                            нашей Политике конфиденциальности.
                        </span>
                        <a href="!#" className="sign__privacy-link">
                            Подробнее
                        </a>
                    </p>
                </div>
                <Button className={'btn-component__sign-modal btn'} onClick={onSubmit} text={'Далее'} />
            </form>
        </div>
    );
}

export default ModalFormSecond;
