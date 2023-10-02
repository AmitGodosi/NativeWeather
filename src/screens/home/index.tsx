import { useState } from 'react';
import { getCityInfo } from '../../services/api';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { ERROR_MESSAGE } from '../../consts';
import Search from '../search';

function Home() {
	const [cityName, setCityName] = useState<string>('Tel Aviv')

	const { isLoading, error, data } = useQuery({
		queryKey: ['city-name', cityName],
		queryFn: () => getCityInfo(cityName)
	})

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, letterSpacing: 1, flex: 1 }}>Weather App</Text>
			<Search changeCityName={(cityName: any) => setCityName(cityName)} />
			<View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center', gap: 20 }}>
				{Object.keys(data ?? {})?.length > 0 && (
					<>
						<Text style={{ fontSize: 80, letterSpacing: 1 }}>{data?.name}</Text>
						<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
							<Text style={{ fontSize: 30, letterSpacing: 1 }}>{data?.temperature}</Text>
							<MaterialCommunityIcons name="temperature-celsius" size={30} color="black" />
						</View>
					</>
				)}
				{isLoading && <Text style={{ fontSize: 80, letterSpacing: 1 }}>Loading...</Text>}
				{error && <Text style={{ fontSize: 80, letterSpacing: 1 }}>{ERROR_MESSAGE}</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 50,
		position: 'relative'
	},
})

export default Home;