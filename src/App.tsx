import { Container, Grid, Paper, Input, Button } from '@material-ui/core';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { filterUsers, getAdditionalUsers, getUsers, setOnFirstPage, UsersType } from './bll/mainReducer';
import { AppRootReducer } from './bll/store';
import UserCard from './ui/UserCard/UserCard';
import style from './ui/AppStyle/App.module.scss';


const App = React.memo(() => {

	const users = useSelector<AppRootReducer, Array<UsersType>>(state => state.main.results);
	const page = useSelector<AppRootReducer, number>(state => state.main.info.page);
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const [isFiltered, setIsFiltered] = useState(false);

	useEffect(() => {
		if (value === '') {
			dispatch(setOnFirstPage())
			dispatch(getUsers());
		}
	}, [value]);

	const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	}, [])

	const onFilterClick = useCallback(() => {
		dispatch(filterUsers(value));
		setIsFiltered(true);
	}, [dispatch, value])

	const searchHandler = useCallback(() => {
		if (isFiltered) return
		dispatch(getAdditionalUsers(page))
	}, [dispatch, isFiltered, page])

	const text = isFiltered ? '' : 'Loading...'

	console.log(page);

	return (
		<div className="App">
			<Container maxWidth="md">
				<div className={style.btnAndSearchContainer} >
					<Button className={style.btn}  variant="contained" onClick={onFilterClick}>Search</Button>
					<Input className={style.input} value={value} onChange={onInputChange} type="text" />
				</div>
				<InfiniteScroll dataLength={users.length}
					hasMore={true}
					loader={text}
					next={searchHandler}
					style={{ overflow: 'hidden', textAlign: 'center' }}
				>
					<Grid container spacing={2} justify="center" style={{ textAlign: 'start', marginBottom: '10px', display: 'flex', flexWrap: 'wrap' }}>
						{users.map(user => {
							return (
								<Grid item>
									<Paper style={{ padding: '10px' }}>
										<UserCard key={user.phone} email={user.email} firstName={user.name.first} lastName={user.name.last} phoneNumber={user.phone} imgLink={user.picture.medium} city={user.location.city} gender={user.gender} nationality={user.nat} />
									</Paper>
								</Grid>
							)
						})}
					</Grid>
				</InfiniteScroll>
			</Container>
		</div>
	);
})

export default App;
