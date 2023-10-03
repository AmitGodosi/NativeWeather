import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
				DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
				DMRegular: require("./assets/fonts/DMSans-Regular.ttf")
			});
		};

		loadFonts();
	}, []);

	return (
		<View style={styles.container}>
			<QueryClientProvider client={queryClient}>
				<Home />
			</QueryClientProvider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
