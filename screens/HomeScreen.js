import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Audio } from 'expo-av'
import { Divider, Surface } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const imageIndex = {
  logo: require("../assets/images/logo.jpg"),
};


const playSound = async () => {
  // if (!soundEnabled) return; // skip if sound is off
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

const HomeScreen = () => {
  return (



    <Surface style={styles.container}>
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