import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { loginUser } from '../util/auth';
import { Alert } from 'react-native';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await loginUser(email, password);
		} catch (error) {
			Alert.alert(
				"Couldn' t Login",
				'Please check your credentials or try again later.'
			);
		}
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message={'Logging in...'} />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
