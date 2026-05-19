import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const EventsListsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventsListScreen</Text>
        </View>
    )
}

export default EventsListsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fa7874',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})