import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Audio } from 'expo-av'
import { Divider, Surface, Text } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';



const HomeScreen = () => {

  const imageIndex = {
    logo: require("../assets/images/logo.jpg")
  };

  const { theme, soundEnabled } = useAppPreferences();

  const playSound = async () => {
    if (!soundEnabled) return; // skip if sound is off
    try {
      const { sound } = await Audio.Sound.createAsync(require("../assets/sounds/universfield-new-notification-056-494256.mp3"));
      await sound.playAsync();
      // optional: unload after play to free memory
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (

    <Surface style={{ flex: 1, padding: 20 }} elevation={5}>
      <Text variant="headlineLarge" style={{ marginBottom: 24, fontSize: theme.fontSizes.body, fontWeight: "bold", textAlign: "center", marginVertical: 20, color: theme.colors.Primary }}>Welcome To Elevate Horizon Connect!</Text>
      <Divider />
      <TouchableOpacity onPress={playSound} activeOpacity={0.7}>
        <Image source={imageIndex.logo} resizeMode='contain' style={{ width: "300", height: 150, margin: 20 }} /><Image />
      </TouchableOpacity >
      <Divider />
    </Surface>

  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6fd9ff',
  }
})