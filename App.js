import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <Main/>
    </SafeAreaProvider>
  );
}

function Main() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}
