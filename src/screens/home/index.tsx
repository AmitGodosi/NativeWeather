import { useState } from 'react';
import { getCityInfo } from '@/services/api';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { ERROR_MESSAGE, INITAL_CITY_NAME, QUERY_KEYS } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import Search from './components/search';

function Home() {
	const [cityName, setCityName] = useState<string>(INITAL_CITY_NAME)

	const { isLoading, error, data } = useQuery({
		queryKey: [QUERY_KEYS.CITY_NAME, cityName],
		queryFn: () => getCityInfo(cityName)
	})

	const { isDayTime, name, temperature } = data || {};
	const isDataAvailable = Object.keys(data ?? {})?.length > 0;

	return (
		<>
			<StatusBar hidden />
			<ImageBackground source={isDayTime ? require('../../../assets/backgrounds/day.png') : require('../../../assets/backgrounds/night.png')} style={styles.image}>
				<View style={styles.container}>
					<Text style={{ fontFamily: 'DMRegular' ,fontSize: 30, letterSpacing: 1, flex: 1, color: isDayTime ? 'black' : 'white' }}>Weather App</Text>
					<Search isDayTime={isDayTime} changeCityName={(cityName: any) => setCityName(cityName)} />
					<View style={{ flex: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 50 }}>
						{isDataAvailable && (
							<>
								<Text style={{ fontFamily: 'DMBold', fontSize: 80, letterSpacing: 1 }}>{name}</Text>
								<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
									<Text style={{ fontFamily: 'DMRegular', fontSize: 30, letterSpacing: 1 }}>{temperature}</Text>
									<MaterialCommunityIcons name="temperature-celsius" size={30} color="black" />
								</View>
							</>
						)}
						{isLoading && <Text style={{ fontSize: 80, letterSpacing: 1 }}>Loading...</Text>}
						{error && !isDataAvailable && <Text style={{ fontSize: 50, letterSpacing: 1 }}>{ERROR_MESSAGE}</Text>}
					</View>
				</View>
			</ImageBackground>
		</>
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
	image: {
		resizeMode: 'cover',
		flex: 1,
		width: '100%'
	}
})

export default Home;