import React, { useState } from 'react';
import style from './UserCard.module.scss';

type UserCardPropsType = {
	imgLink: string,
	firstName: string,
	lastName: string,
	phoneNumber: string,
	email: string,
	city: string,
	gender: string,
	nationality: string
}

const UserCard = React.memo((props: UserCardPropsType) => {

	const [isRotated, setIsRotated] = useState(false);

	const setIsRoteted = () => {
		setIsRotated(!isRotated);
	}

	return (
		<>
			<div className={isRotated ? style.cardContainer + ' ' + style.rotated : style.cardContainer} onClick={setIsRoteted}>
				<div className={style.cardFace} onClick={setIsRoteted}>
					<div className={style.cardFaceContainer}>
						<div className={style.imageContainer}>
							<img className={style.image} src={props.imgLink} alt="no pic;(" />
						</div>
						<div className={style.infoContainer}>
							<div><span className={style.title}>Name: </span>{props.firstName + ' ' + props.lastName}</div>
							<div><span className={style.title}>EMail: </span>{props.email}</div>
							<div><span className={style.title}>Phone: </span>{props.phoneNumber}</div>
						</div>
					</div>
				</div>
				<div className={style.cardFaceBack} onClick={setIsRoteted}>
					<div className={style.cardFaceBackContainer}>
						<div><span className={style.title}>Location: </span>{props.city}</div>
						<div><span className={style.title}>Gender: </span>{props.gender}</div>
						<div><span className={style.title}>Nationality: </span>{props.nationality}</div>
					</div>
				</div>
			</div>
		</>
	)
});

export default UserCard