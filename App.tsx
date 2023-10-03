import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Home from './src/screens/home';
import * as Font from 'expo-font';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
				DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
				DMRegular: require("./assets/fonts/DMSans-Regular.ttf")
			});
		};

		loadFonts();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<QueryClientProvider client={queryClient}>
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
