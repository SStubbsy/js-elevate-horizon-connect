import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import React from 'react'

const EventDetailsScreen = (props) => {
    const { eventNumber, eventSuburb } = props.route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventDetailsScreen</Text>
            <Text style={styles.title}>{eventNumber}</Text>
            <Text style={styles.title}>{eventSuburb}</Text>
            <Button icon="camera" mode="contained" onPress={() => {
                props.navigation.navigate("Events Registration", {
                    eventNumber: 456,
                    eventSuburb: "Waitara",
                })
                console.log('Pressed')
            }}>
                Press me
            </Button>
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