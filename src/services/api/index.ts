import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL = 'http://dataservice.accuweather.com';

export const getCityInfo = async (city: string) => {
	const URL = `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`;
	const cityRes = await axios.get(URL);
	const weatherRes = await getCityCurrentWeather(cityRes?.data?.[0]?.Key)
	const cityInfo = {
		name: cityRes?.data?.[0]?.LocalizedName,
		key: cityRes?.data?.[0]?.Key,
		temperature: weatherRes?.temperature,
		isDayTime: weatherRes?.isDayTime
	}
	return cityInfo;
};

export const getCityCurrentWeather = async (key: string) => {
	const CITY_WEATHER_API = `${BASE_URL}/currentconditions/v1/`;
	const URL = `${CITY_WEATHER_API}${key}?apikey=${API_KEY}`;
	const weatherRes = await axios.get(URL);
	return { temperature: weatherRes?.data?.[0]?.Temperature?.Metric?.Value, isDayTime: weatherRes?.data?.[0]?.IsDayTime };
};

export const getAutoComplete = async (searchTerm: string) => {
	if (searchTerm) {
		const AUTO_COMPLETE_API = `${BASE_URL}/locations/v1/cities/autocomplete`;
		const URL = `${AUTO_COMPLETE_API}?apikey=${API_KEY}&q=${searchTerm}`;
		const weatherRes: any = await axios.get(URL);
		return weatherRes?.data?.slice(0,5)
	} else {
		return null;
	}
};

