import { getAutoComplete } from '@/services/api';
import { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { EMPTY_STRING, ERROR_MESSAGE, QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

type Props = {
	changeCityName: (cityInfo: any) => void;
	isDayTime: boolean;
}

export default function Search({ changeCityName, isDayTime }: Props) {
	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const textInputRef = useRef<any>(null);

	const { isLoading, error, data } = useQuery({
		queryKey: [QUERY_KEYS.AUTO_COMPLETE, searchTerm],
		queryFn: () => getAutoComplete(searchTerm)
	})

	const fetchCityInfoHandler = (item: any) => {
		try {
			changeCityName(item?.LocalizedName)
			setInitalState()
		} catch (error) {
			console.log(error)
		}
	}

	const setInitalState = () => {
		setSearchTerm(EMPTY_STRING)
		textInputRef?.current?.clear();
	}

	return (
		<View style={styles.container}>
				<TextInput
					ref={textInputRef}
					onChangeText={(text) => setSearchTerm(text)}
					style={{ backgroundColor: 'aliceblue', height: 40, borderRadius: 10, padding: 10, fontSize: 16 }}
					placeholder='Search for city'
				/>
			{data?.length > 0 && (
				<FlatList
					data={data}
					keyExtractor={(item) => item?.Key}
					renderItem={({ item }: any) => (
						<Text
							onPress={() => fetchCityInfoHandler(item)}
							style={{ fontSize: 16, marginBottom: 5 }}
						>{item.LocalizedName}</Text>
					)}
				/>)
			}
			{isLoading && <Text style={{ fontSize: 30, letterSpacing: 1 }}>Loading...</Text>}
			{error && <Text style={{ fontSize: 30, letterSpacing: 1 }}>{ERROR_MESSAGE}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		width: '60%',
		gap: 10
	}
})