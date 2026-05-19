import { createStackNavigator } from '@react-navigation/stack';

import EventsListScreen from '../screens/EventsListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';

const Stack = createStackNavigator();

export default function EventNavigator() {
    return (

        <Stack.Navigator initialRouteName='Events List' screenOptions={{ headerShown: true }}>
            <Stack.Screen name='Events List' component={EventsListScreen}></Stack.Screen>
            <Stack.Screen name='Event Details' component={EventDetailsScreen}></Stack.Screen>
            <Stack.Screen name='Events Registration' component={EventRegistrationScreen}></Stack.Screen>
        </Stack.Navigator>

    )
}