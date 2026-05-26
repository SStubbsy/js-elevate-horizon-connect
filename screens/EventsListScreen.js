import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { Text, Button, Card } from 'react-native-paper'
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../services/apiService';

const EventsListsScreen = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {
        console.log("Hello from Jacob")
        loadEvents();
    }, []);

    async function loadEvents() {
        console.log("LoadEvent")
        setLoading(true);
        const result = await getAllEvents();
        if (result.success) {
            setEvents(result.events);
            setOffline(result.offline);
            console.log(events)
        }
        else {
            setError(result.error)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>"Loading Events..."</Text>
            </View>
        )
    }

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
            {offline && (
                <View>
                    <Text>
                        Text offline mode
                    </Text>
                </View>
            )}
            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <Text sytle={styles.title}>
                            {item?.title}
                        </Text>
                        <Text>
                            {item?.date}
                        </Text>
                        <Text>
                            {item?.location}
                        </Text>
                        <Text>
                            {item?.spotRemaining}
                        </Text>
                    </View>
                )
                }
            />
        </View >
    )
}

export default EventsListsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#3d3d3d",
        borderRadius: 8,
    }
})