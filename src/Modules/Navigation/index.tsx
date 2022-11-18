import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import NavLink from "../../components/NavLink";
import './Navigation.scss';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleIcon from '@mui/icons-material/People';
import {  Role, UserProc } from "../../store/user/userSlice";
import { useAppSelector } from "../../hooks/hooks";

const Navigation = () => {
  const user: UserProc = useAppSelector((store: any) => store.user.user)
  return (
      <nav className="modules-navigation">
          <Link to="/home">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="modules-navigation__svg">
                  <g>
                      <path
                          d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958
                1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                      ></path>
                  </g>
              </svg>
          </Link>
          <div className="nav-list__link">
              <HomeIcon />
              <NavLink url={'/home'} text={'Главная'} />
          </div>
          {!user?.role && (
              <div className="nav-list__link">
                  <NotificationsNoneIcon />
                  <NavLink url={'/home'} text={'Уведомления'} />
              </div>
          )}

          {!user?.role && (
              <div className="nav-list__link">
                  <BookmarksIcon />
                  <NavLink url={'/bookmarks'} text={'Закладки'} />
              </div>
          )}

          <div className="nav-list__link">
              <PersonOutlineIcon />
              <NavLink url={'/profile'} text={'Профиль'} />
          </div>

          {user?.role === Role.ADMIN && (
              <div className="nav-list__link">
                  <PeopleIcon />
                  <NavLink url={'/users'} text={'Пользователи'} />
              </div>
          )}

          <Button className={'modules-navigation__btn-twit'} text={'Твитнуть'} />
      </nav>
  );
}

export default React.memo(Navigation);