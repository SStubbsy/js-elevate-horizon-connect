import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppPreferencesProvider, useAppPreferences } from './components/AppPreferencesContext';
import { enableScreens } from 'react-native-screens';
import MainNavigator from './navigation/MainNavigator';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppPreferencesProvider>
        <Main />
      </AppPreferencesProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const { theme } = useAppPreferences();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style='auto'/>
    </PaperProvider>
  )
}
