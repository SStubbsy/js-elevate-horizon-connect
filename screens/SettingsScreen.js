import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RadioButton, Surface, Text, Switch } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingScreen = () => {

  const { fontSizeKey, isDarkTheme, setFontSize, soundEnabled, theme, toggleSound, toggleTheme } = useAppPreferences();

  return (
    <Surface style={{ flex: 1, padding: 20 }}>
      <View variant="headlineLarge" style={{ marginBottom: 24, fontWeight: "bold", textAlign: "left", marginLeft: 8 }}>Settings</View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingHorizontal: 10, paddingVertical: 12, borderRadius: 12, backgroundColor: theme.colors.onPrimary }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 15 }}>Current Theme:</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} style={{ marginRight: 20 }} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingHorizontal: 10, paddingVertical: 12, borderRadius: 12, backgroundColor: theme.colors.onPrimary }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 15 }}>Sound Toggle ON/OFF:</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} style={{ marginRight: 20 }} />
      </View>

      <View style={{ borderRadius: 12, backgroundColor: theme.colors.onPrimary }}>
        <RadioButton.Group onValueChange={setFontSize} value={fontSizeKey}>
          <RadioButton.Item label='Small' value='small' labelStyle={{ fontSize: theme.fontSizes.body }} style={{ marginVertical: 0, paddingVertical: 3 }} />
          <RadioButton.Item label='Medium' value='medium' labelStyle={{ fontSize: theme.fontSizes.body }} style={{ marginVertical: 0, paddingVertical: 3 }} />
          <RadioButton.Item label='Large' value='large' labelStyle={{ fontSize: theme.fontSizes.body }} style={{ marginVertical: 0, paddingVertical: 3 }} />
        </RadioButton.Group>
      </View>

    </Surface>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d66fff',
  }
})