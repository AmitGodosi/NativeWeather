import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/screens/home';
import Search from '@/screens/search';

const Tab = createBottomTabNavigator();

function TabsNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Search" component={Search} />
		</Tab.Navigator>
	);
}

export default TabsNavigator;