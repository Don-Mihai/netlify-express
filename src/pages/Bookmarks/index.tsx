import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Navigation from '../../Modules/Navigation';
import './Bookmarks.scss';
import Options from '../../components/Options';
import Aside from '../../Modules/Aside';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { UserProc, fetch as fetchUser, Role } from '../../store/user/userSlice';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { PostStore, fetchPosts, addLikeQuantity, reduceLikeQuantity } from '../../store/post/postSlice';
import Avatar from '@mui/material/Avatar';
import { BookmarksData, fetchByUser, remove } from '../../store/bookmarks/bookmarkSlice';
import { addLike, PLike, removeLike } from '../../store/like/like';


function Bookmarks() {
	const [searchText, setSearchText] = useState('');
	const posts: PostStore = useAppSelector((store: any) => store.post)
	const user: UserProc = useAppSelector((store: any) => store.user.user)
    const bookmarks: BookmarksData = useAppSelector((store: any) => store.bookmark)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchUser(Number(sessionStorage.getItem('userId'))))
		dispatch(fetchPosts())
	}, [])

    useEffect(() => {
        dispatch(fetchByUser(user.id))
    }, [user.id])

	const options = useMemo(() =>[
		'Удалить',
	], [])


	const handleClickDelete = useCallback((id: number | undefined) => {
		id && dispatch(remove(id)).then(() => dispatch(fetchPosts())).then(() => dispatch(fetchByUser(user.id)))


	}, [])
	
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value)
	}, [])

    const handleLike = async(_: any, idPost: number) => {
        const payload: PLike = {
            idUser: user.id,
            idPost: idPost
        }

        await dispatch(addLike(payload))
        await dispatch(fetchUser(Number(sessionStorage.getItem('userId'))))
        dispatch(addLikeQuantity(idPost))
    }

    const handleDislike = async (_: any, idPost: number, idLike?: number ) => {

        await dispatch(removeLike(idLike))

        await dispatch(fetchUser(Number(sessionStorage.getItem('userId'))))

        dispatch(reduceLikeQuantity(idPost))
    }

	return (
        <section className="bookmark">
            <Navigation />
            <section className="bookmark__posts">
                <h2 className="bookmark__title">Закладки</h2>
                {!bookmarks?.bookmarks.length ? (
                    <h3 className='bookmark__subtitle'>У вас нет закладок!</h3>
                ) : (
                    posts.processPosts
                        .filter((item)=>{
                            const idPosts =  bookmarks?.bookmarks?.map(bookmark => bookmark.idPost)
                            
                            if(idPosts?.includes(item.id)) {
                                return true
                            } else {
                                return false
                            }
                        })
                        .filter(item => item.body.toLowerCase().includes(searchText.toLowerCase()))
                        .map(post => {
                            return (
                                <div key={post.id} className="bookmark__posts-wrapper">
                                    <div className="bookmark__posts-header">
                                        <div className="bookmark__posts-avatar-wrapper">
                                            <Avatar alt="avatar" src={`http://localhost:5000/${post?.avatarUrl}`} sx={{ width: 40, height: 40 }}>
                                                {post.name}
                                            </Avatar>
                                            <h3 className="bookmark__posts-title">
                                                {post.name} {post.login}
                                            </h3>
                                        </div>

                                        {user.role === Role.ADMIN || post.idUser === user.id ? (
                                            <Options
                                                className={'bookmark__posts-option'}
                                                options={options}
                                                id={post.id}
                                                onClickEdit={() => handleClickDelete(bookmarks?.bookmarks.find((item)=> item.idPost === post.id)?.id)}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <div className="bookmark__posts-container">
                                        <p className="bookmark__posts-body">{post.body}</p>
                                        {post?.imgUrl && <img className="bookmark__posts-img" src={`http://localhost:5000/${post?.imgUrl}`} alt="" />}
                                    </div>
                                    {user?.lickedPosts?.find(item => item.idPost === post.id) ? (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={e => handleDislike(e, post.id, user?.lickedPosts?.find(item => item.idPost === post.id)?.id)}
                                                color={'primary'}
                                            >
                                                <FavoriteIcon />
                                                {post.likesQuantity}
                                            </IconButton>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton aria-label="delete" onClick={e => handleLike(e, post.id)} color={'primary'}>
                                                <FavoriteBorderIcon />
                                                {post.likesQuantity}
                                            </IconButton>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                        .reverse()
                )}
            </section>
            <Aside handleChange={handleChange} searchText={searchText} />
        </section>
    );
}

export default Bookmarks;