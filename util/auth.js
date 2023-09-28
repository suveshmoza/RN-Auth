import axios from 'axios';
import { API_KEY } from '@env';

async function authenticate(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
	const response = await axios.post(url, {
		email,
		password,
		returnSecureToken: true,
	});
	console.log(response.data);
}

export async function createUser(email, password) {
	try {
		await authenticate('signup', email, password);
	} catch (error) {
		console.error('Error creating new user:', error);
	}
}

export async function loginUser(email, password) {
	try {
		await authenticate('signInWithPassword', email, password);
	} catch (error) {
		console.log('Error while logging in', err);
	}
}
