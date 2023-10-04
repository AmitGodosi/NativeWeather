import { StyleSheet, View } from 'react-native';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import Home from './src/screens/home';
import * as Font from 'expo-font';

const queryClient = new QueryClient()

export default function App() {
	const loadFonts = async () => {
		await Font.loadAsync({
			DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
			DMRegular: require("./assets/fonts/DMSans-Regular.ttf")
		});
	};
	loadFonts();

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
