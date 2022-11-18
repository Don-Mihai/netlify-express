import './ModalFormGoogle.scss';
import Button from '../../components/Button';
import React from 'react';

function ModalFormGoogle({onClose}: {onClose: any}) {

  return (
    <div>
      <div className="sign__modal_form">
      <h2 className="sign__modal_form-title">Зарегистрироваться с помощью гугл аккаунта</h2>
        <div className="relative">
          <Button className={'sign-modal__sign-modal btn'} onClick={onClose} text={'Зарегистрироваться'}/>
        </div>
      </div>
    </div>
  );
}

export default ModalFormGoogle;
