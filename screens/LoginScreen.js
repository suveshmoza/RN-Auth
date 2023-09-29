import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { loginUser } from '../util/auth';
import { Alert } from 'react-native';
import { useAuth } from '../context/authContext';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const { authenticate } = useAuth();

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await loginUser(email, password);
			authenticate(token);
		} catch (error) {
			Alert.alert(
				"Couldn' t Login",
				'Please check your credentials or try again later.'
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message={'Logging in...'} />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
