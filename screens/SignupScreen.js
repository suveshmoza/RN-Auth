import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { useAuth } from '../context/authContext';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const { authenticate } = useAuth();
	async function signupHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await createUser(email, password);
			authenticate(token);
		} catch (error) {
			Alert.alert(
				'Sign up failed',
				"Couldn'\t create new user. Please try again later!"
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message={'Creating new user...'} />;
	}

	return (
		<KeyboardAwareScrollView style={{ flex: 1 }}>
			<AuthContent onAuthenticate={signupHandler} />
		</KeyboardAwareScrollView>
	);
}

export default SignupScreen;
