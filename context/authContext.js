import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();

	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem('token');
			if (storedToken) {
				setAuthToken(storedToken);
			}
		}
		fetchToken();
	}, []);

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('token', token);
	}
	function logout() {
		setAuthToken(null);
		AsyncStorage.removeItem('token');
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
