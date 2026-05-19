import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const EventRegistrationScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventRegistrationScreen</Text>
        </View>
    )
}

export default EventRegistrationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7a5cff',
        justifyContent: 'center',

    },
    title: {
        textAlign: 'center'
    }
})