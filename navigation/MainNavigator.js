import { View, Text, Settings } from 'react-native'
import React, { useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import SettingScreen from '../screens/SettingsScreen'
import EventNavigator from './EventNavigator'

const MainNavigator = () => {
    const [index, setIndex] = useState(0);

    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'events', title: 'Events List', icon: 'event' },
        { key: 'settings', title: 'Settings', icon: 'settings' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        events: EventNavigator,
        settings: SettingScreen
    });

    return (
        <BottomNavigation navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationEnabled
            shifting={false}
            renderIcon={({ route, color }) => <MaterialIcons name={route.icon} size={24} color={color} />}
        />
    )
}

export default MainNavigator;