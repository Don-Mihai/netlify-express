import React from 'react';
import './Button.scss';

interface Props {
  text: any;
  className?: string;
  icon?: React.ReactNode;
  onClick?: (event:any) => any;
  id?: string;
}

function Button({text, icon, className, onClick, id}: Props) {
  return (
    <button className={`btn-component ${className}`} onClick={onClick} id={id} type="submit">
      {icon}
      <span className='btn-component-min'>{text}</span>
    </button>
  );
}

export default React.memo(Button);