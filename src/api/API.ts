import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://randomuser.me/api/',
})

export const API = {
	getUsers(page: number = 1) {
		return instance.get(`?page=${page}&results=10`);
	}
}