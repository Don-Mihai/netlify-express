import './ModalFormApple.scss';
import Button from '../../components/Button';
import React from 'react';

function ModalFormApple({onClose}: {onClose: any}) {

  return (
    <div>
      <div className="sign__modal_form">
      <h2 className="sign__modal_form-title">Зарегистрироваться с помощью apple аккаунта</h2>
        <div className="relative">
          <Button className={'btn-component__sign-modal btn'} onClick={onClose} text={'Зарегистрироваться'}/>
        </div>
      </div>
    </div>
  );
}

export default ModalFormApple;
