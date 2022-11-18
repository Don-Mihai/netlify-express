import React from 'react';
import {Link} from 'react-router-dom';
import './NavLink.scss';

function NavLink({url, text}: {url: string, text: string}) {
  return (
    <Link className='modules-navigation__link' to={url}>{text}</Link>
  );
}

export default NavLink;