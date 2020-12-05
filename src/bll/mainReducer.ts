import { Dispatch } from "redux"
import { API } from "../api/API"

const initialState: MainStateType = {
	results: [],
	info: {
		seed: '',
		results: 10,
		page: 1
	}
}

export const mainReducer = (state: MainStateType = initialState, action: ActionsType): MainStateType => {
	switch (action.type) {
		case 'main/SET-USERS': {
			return { ...state, results: [...action.data.results] }
		}
		case 'main/SET-NEW-USERS': {
			return { ...state, results: [...state.results, ...action.data.results] }
		}
		case 'main/SET-NEW-PAGE': {
			return { ...state, info: { ...state.info, page: state.info.page + 1 } }
		}
		case 'main/SET-ON-FIRST-PAGE': {
			return { ...state, info: { ...state.info, page: 1 } }
		}
		case 'main/FILTER-USERS': {
			return { ...state, results: [...state.results.filter(f => f.email.toLowerCase().includes(action.value.toLowerCase()) || f.name.first.toLowerCase().includes(action.value.toLowerCase()) || f.name.last.toLowerCase().includes(action.value.toLowerCase()) || f.phone.toLowerCase().includes(action.value.toLowerCase()))] }
		}
		default: {
			return state;
		}
	}
}

//Actions
export const setUsers = (data: AllDataType) => {
	return { type: 'main/SET-USERS', data } as const
}

export const setNewUsers = (data: AllDataType) => {
	return { type: 'main/SET-NEW-USERS', data } as const
}

export const setNewPage = () => {
	return { type: 'main/SET-NEW-PAGE' } as const
}
export const setOnFirstPage = () => {
	return { type: 'main/SET-ON-FIRST-PAGE' } as const
}
export const filterUsers = (value: string) => {
	return { type: 'main/FILTER-USERS', value } as const
}


//Thunk
export const getUsers = () => {
	return (dispatch: Dispatch) => {
		API.getUsers()
			.then(res => {
				dispatch(setNewPage());
				dispatch(setUsers(res.data));
			})
			.catch(err => {
				console.log(err.message);
			})
	}
}

export const getAdditionalUsers = (pageNumber: number) => {
	return (dispatch: Dispatch) => {
		API.getUsers(pageNumber)
			.then(res => {
				dispatch(setNewPage());
				dispatch(setNewUsers(res.data))
			})
			.catch(err => {
				console.log(err.message);
			})
	}
}

export type MainStateType = AllDataType;
export type AllDataType = {
	results: Array<UsersType>
	info: {
		seed: string,
		results: number,
		page: number,
		version?: string
	}
}
export type UsersType = {
	gender: string,
	name: {
		title: string,
		first: string,
		last: string,
	}
	location: {
		street: string,
		city: string,
		state: string,
		postcode: string,
		coordinates: {
			latitude: string,
			longitude: string
		},
		timezone: {
			offset: string,
			description: string
		}
	}
	email: string,
	login: {
		uuid: string,
		username: string,
		password: string,
		salt: string,
		md5: string,
		sha1: string,
		sha256: string
	},
	dob: {
		date: string,
		age: number
	},
	registered: {
		date: string,
		age: number
	},
	phone: string,
	cell: string,
	id: {
		name: string,
		value: string
	},
	picture: {
		large: string,
		medium: string,
		thumbnail: string,
	},
	nat: string
}
export type ActionsType = ReturnType<typeof setUsers>
	| ReturnType<typeof setNewUsers>
	| ReturnType<typeof setNewPage>
	| ReturnType<typeof filterUsers>
	| ReturnType<typeof setOnFirstPage>