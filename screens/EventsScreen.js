import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EventScreen = () => {
    return (
        <View style={styles.container}>
            <Text>EventScreen</Text>
        </View>
    )
}

export default EventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6fd9ff',
    }
})