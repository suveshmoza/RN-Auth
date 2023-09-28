import axios from 'axios';
import { API_KEY } from '@env';

export async function createUser(email, password) {
	try {
		await axios.post(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
				API_KEY,
			{
				email,
				password,
				returnSecureToken: true,
			}
		);
	} catch (error) {
		console.error('Error storing expense:', error);
	}
}
