import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { AuthContextProvider, useAuth } from './context/authContext';
import IconButton from './components/ui/IconButton';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const { logout } = useAuth();
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon={'exit'}
							color={tintColor}
							size={24}
							onPress={logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const { isAuthenticated } = useAuth();
	let component = <AuthStack />;
	if (isAuthenticated) {
		component = <AuthenticatedStack />;
	}

	return <NavigationContainer>{component}</NavigationContainer>;
}

function Root() {
	const [isLoading, setIsLoading] = useState(true);
	const { authenticate } = useAuth();
	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem('token');
			if (storedToken) {
				authenticate(storedToken);
			}
			setIsLoading(false);
			await SplashScreen.hideAsync();
		}
		fetchToken();
	}, []);

	return <Navigation />;
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
