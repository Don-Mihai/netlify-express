import React from 'react';
import './Modal.scss';

interface Props extends React.PropsWithChildren {
  open: boolean;
  toggleModal: ()=> void;
}

function Modal({open, toggleModal, children}: Props) {
  return (
    <div className= {` modal bounceIn ${open ? 'modal--show' : ''}`}  >
      <div className='modal__form'>
      <div className="modal__close" onClick={toggleModal}>+</div>
        {children}
      </div>
    </div>
  );
}

export default Modal;