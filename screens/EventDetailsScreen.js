import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const EventDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventDetailsScreen</Text>
        </View>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5cffb5',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center'
    }
})