import { getAutoComplete } from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { EMPTY_STRING } from '../../consts';

type Props = {
	changeCityName: (cityInfo: any) => void;
}

export default function Search({ changeCityName }: Props) {
	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const textInputRef = useRef<any>(null);

	useEffect(() => {
		if (searchTerm?.length > 0) {
			const fetchAutoComplete = async () => {
				getAutoComplete(searchTerm)
				const autoCompleteRes = await getAutoComplete(searchTerm)
				setSearchResult(autoCompleteRes)
			}
			fetchAutoComplete()
		}
	}, [searchTerm])

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
		setSearchResult([])
		textInputRef?.current?.clear();
	}

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: 'center' }}>Search for city</Text>
			<TextInput
				ref={textInputRef}
				onChangeText={(text) => setSearchTerm(text)}
				style={{ backgroundColor: 'aliceblue', height: 40, borderRadius: 10, padding: 10 }}
			/>
			{searchResult?.length > 0 && (
				<FlatList
					data={searchResult}
					keyExtractor={(item) => item?.Key}
					renderItem={({ item }: any) => (
						<Text
							onPress={() => fetchCityInfoHandler(item)}
							style={{ fontSize: 16, marginBottom: 5 }}
						>{item.LocalizedName}</Text>
					)}
				/>)
			}
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