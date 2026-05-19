import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import React from 'react'

const EventsListsScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EventsListScreen</Text>
            <Button icon="camera" mode="contained" onPress={() => {
                props.navigation.navigate("Event Details", {
                    eventNumber: 123,
                    eventSuburb: "Hornsby"
                })
                console.log('Pressed')
            }}>
                Press me
            </Button>
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