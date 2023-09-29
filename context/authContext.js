import { createContext, useContext, useState } from 'react';

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
	function authenticate(token) {
		setAuthToken(token);
	}
	function logout() {
		setAuthToken(null);
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
