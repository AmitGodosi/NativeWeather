import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './Tabs';
import Home from '@/screens/home';
import Search from '@/screens/search';
import { RootStackParamList } from './Routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
	return (
		<Stack.Navigator>
			{/*<Stack.Screen name="Home" component={Home} />*/}
			{/*<Stack.Screen name="Search" component={Search} />*/}
			<Stack.Screen name="Tabs" component={TabsNavigator} />
		</Stack.Navigator>
	);
}

export default StackNavigator;