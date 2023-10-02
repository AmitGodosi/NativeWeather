import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native';
//import StackNavigator from '@/services/navigation/Stack';
import Home from './src/screens/home';

const queryClient = new QueryClient()

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<QueryClientProvider client={queryClient}>
				{/*<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>*/}
				<Home />
			</QueryClientProvider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
