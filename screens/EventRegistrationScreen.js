import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const EventRegistrationScreen = (props) => {
    const { eventNumber, eventSuburb } = props.route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventRegistrationScreen</Text>
            <Text style={styles.title}>{eventNumber}</Text>
            <Text style={styles.title}>{eventSuburb}</Text>
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