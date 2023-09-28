import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function signupHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await createUser(email, password);
		} catch (error) {
			console.error('Error storing expense:', error);
			throw new Error('Failed to store expense data');
		}
		setIsAuthenticating(false);
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
