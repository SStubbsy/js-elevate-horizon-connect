import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Text, Button, Card, Searchbar } from 'react-native-paper'
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../services/apiService';

const EventsListsScreen = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

            <View style={styles.topSection}>

                <Text style={styles.title}>EventsListScreen</Text>

                <Searchbar
                    style={styles.Searchbar}
                    placeholder="Search Events..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <Button
                    style={styles.viewTodayEventBtn}
                    icon="calendar-today"
                    mode="contained" onPress={() => {
                        props.navigation.navigate("Event Details", {
                            eventNumber: 123,
                            eventSuburb: "Hornsby"
                        })
                        console.log('Pressed')
                    }}>
                    View Today's Events
                </Button>

                <View style={styles.btnRow}>
                    <Button mode="contained">Athletics</Button>
                    <Button mode="contained">Today</Button>
                    <Button mode="contained">Fitness</Button>
                    <Button mode="contained">Music</Button>
                </View>

                <View style={styles.btnRow}>
                    <Button mode="contained">Social</Button>
                    <Button mode="contained">Outdoors</Button>
                    <Button mode="contained">Family</Button>
                </View>

            </View>
            <View style={styles.bottomSection}>
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
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => (props.navigation.navigate("Event Details", { event: item, offline }))}>
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
                                    {item?.spotsRemaining}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
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
    },
    searchBar: {
        marginBottom: 12,
    },
    topSection: {
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 16,
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    bottomSection: {
        flex: 1,
    }

})