import React, { useEffect, useState } from 'react';
import Navigation from '../../Modules/Navigation';
import './Home.scss';
import Options from '../../components/Options';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Aside from '../../Modules/Aside';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetch as fetchUser, UserData, fetchUsers as fetch, Role } from '../../store/user/userSlice';
import Avatar from '@mui/material/Avatar';

const options = [
	'Удалить',
];

function Users() {
	const [searchText, setSearchText] = useState('');
	const user: UserData = useAppSelector((store: any) => store.user)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchUser(Number(sessionStorage.getItem('userId'))))
		fetchUsers()
	}, [])

	const handleClickDelete = () => {
		// ожидается метода удаление постов с бэка после удаление пользователя
		// dispatch(remove(id)).then(fetchUsers)
	};
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value)
	}

	const fetchUsers = () => {
		dispatch(fetch())
	}

	return (
		<section className="users">
			<Navigation />
			<section className="users__posts">
				<section className='status'>
					<h2 className="status-title">Все пользователи</h2>
				</section>
				{user.isLoading ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box> :
					user.users.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())).map(userItem => {
						return (
							<div key={userItem.id} className='users__posts-wrapper'>
								<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
								<Avatar alt="avatar" src={`http://localhost:5000/${userItem?.imgUrl}`} sx={{ width: 40, height: 40 }} />
                                            
											<div className='users__posts-container'>
												<h3 className='users__posts-title'>{userItem.name} {userItem.login}</h3>
											</div>
								</div>
								
								{userItem?.role !== Role.ADMIN &&  <Options className={'users__posts-option'} options={options} id={userItem.id} onClickDelete={handleClickDelete} />}
							</div>
						)
					}).reverse()}
			</section>
			<Aside handleChange={handleChange} searchText={searchText} />
		</section>
	);
}

export default Users;