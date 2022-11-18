import './Sign.scss';
import Button from '../../components/Button';
import { useCallback, useMemo, useState } from 'react';
import ModalForm from '../../Modules/ModalForm';
import ModalFormSecond from '../../Modules/ModalFormSecond';
import ModalFormThird from '../../Modules/ModalFormThird';
import FooterLink from '../../components/FooterLink';
import React from 'react';
import ModalFormGoogle from '../../Modules/ModalFormGoogle';
import Modal from '../../components/Modal';
import ModalFormApple from '../../Modules/ModalFormApple';
import ModalFormRegistr from '../../Modules/ModalFormRegistr';




var date = new Date().getFullYear();

function Sign() {
  const [openSign, setOpenSign] = useState<boolean>(false);
  const [openGoogle, setOpenGoogle] = useState<boolean>(false);
  const [openApple, setOpenApple] = useState<boolean>(false);
  const [openReg, setOpenReg] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<number>(1);
  //const divref = useRef(null)


  const toggleModalGoogle = useCallback(() => {
    setOpenGoogle(prev => !prev)
  }, [])
  const toggleModalApple = useCallback(() => {
    setOpenApple(prev => !prev)
  }, [])
  const toggleModalSign = useCallback(() => {
    setOpenSign(prev => !prev)
  }, [])
  const toggleModalReg = useCallback(() => {
    setOpenReg(prev => !prev)
  }, [])
  
  const handleClickNextStep = () => {
    setActiveModal((prev: number) => ++prev)
  }
  
  return (
    <div className="sign">
      <div className='sign__container'>
        <div className='sign__img'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='sign__svg_primory'>
            <g>
              <path
                d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958
                1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'
              >
              </path>
            </g>
          </svg>
        </div>
        <div className='sign__content'>
          <div className='sign__wrapper'>
            <svg viewBox='0 0 24 24' aria-hidden='true' className='sign__svg_seccond'>
              <g>
                <path
                  d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958
                  1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'
                >
                </path>
              </g>
            </svg>
            <h2 className='sign__title'>В курсе происходящего</h2>
            <h3 className='sign__title-second'>Присоединяйтесь к Твиттеру прямо сейчас!</h3>
            <div className='sign__btn-wrapper'>
              <Button onClick={toggleModalGoogle} text={'Регистрация с помощью Google'} icon={useMemo(() => <img src="/google.svg" width={20} alt="иконка"></img>, [])} />
              <Modal open={openGoogle} toggleModal={toggleModalGoogle}>
                <ModalFormGoogle onClose={toggleModalGoogle}/>
              </Modal>
              <Button onClick={toggleModalApple} text={'Зарегестрироваться с помощью учетной записью Apple'} icon={useMemo(() => <img src="/apple.svg" width={20} alt="иконка"></img>, [])} />
              <Modal open={openApple} toggleModal={toggleModalApple}>
                  <ModalFormApple onClose={toggleModalApple}/>
              </Modal>
              <div className='sign__dash'>
                <div className='sign__dash-left dash'>
                  <div className='left'></div>
                </div>
                <div className='sign__and_wrapp dash'>
                  <span className='sign__and'>или</span>
                </div>
                <div className='sign__dash-right dash'>
                  <div className='right'></div>
                </div>
              </div>
              <Button onClick={toggleModalSign} className={'sign__btn-signup btn-component'} text= {'Зарегистрируйтесь с помощью номера телефона или адреса электронной почты'} />
              <Modal open={openSign} toggleModal={toggleModalSign}>
                <h3 className="modal__step">Шаг {activeModal >= 3 ? '3' : activeModal}  из 3</h3>
                {activeModal === 1 && <ModalForm  nextStep={handleClickNextStep}/>}
                {activeModal === 2 && <ModalFormSecond nextStep={handleClickNextStep}/>}
                {activeModal === 3 && <ModalFormThird nextStep={handleClickNextStep} onClose={toggleModalSign}/>}
              </Modal>
              <div className='sign__privacy_wrapp'>
                Регистрируясь, вы соглашаетесь с
                <a href="!#" className='sign__privacy-link'>Условиями предоставления услуг</a>
                <span>и</span> 
                <a href="!#" className='sign__privacy-link'>Политикой конфиденциальности</a>
                , а также с
                <a href="!#" className='sign__privacy-link'>Политикой использования файлов cookie</a>
                .
              </div>
              <div className='sign__registr'>
                <h3 className='sign__registr-title'>Уже зарегистрированы?</h3>
                <Button onClick={toggleModalReg} className='sign__registr-btn btn' text= {'Войти'}/>
                <Modal open={openReg} toggleModal={toggleModalReg}>
                  <ModalFormRegistr/>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='sign__footer'>
        <nav className='sign__footer-nav'>
          <FooterLink/>
          <span className='sign__footer-link'>© Twitter, Inc., {date}.</span>
        </nav>
      </footer>
    </div>
  );
}

export default Sign;