import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Button, Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/apiService';
import { useAppPreferences } from '../components/AppPreferencesContext';

const EventsListsScreen = (props) => {

    const { theme } = useAppPreferences();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadEvents();
    }, []);

    async function loadEvents() {
        setLoading(true);
        const result = await getAllEvents();
        if (result.success) {
            setEvents(result.events);
            setOffline(result.offline);
        } else {
            setError(result.error);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.surface }}>
                <ActivityIndicator size="large" />
                <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.onSurface }}>
                    Loading Events...
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 12, backgroundColor: theme.colors.surface }}>

            <View style={{
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderColor: theme.colors.outline,
                marginBottom: 16
            }}>

                <Searchbar
                    style={{ marginBottom: 12 }}
                    placeholder="Search Events..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    inputStyle={{ fontSize: theme.fontSizes.body }}
                    iconColor={theme.colors.onSurface}
                />

                <Button
                    style={{ marginBottom: 12 }}
                    icon="calendar-today"
                    mode="contained"
                    labelStyle={{ fontSize: theme.fontSizes.body }}
                    onPress={() => {
                        props.navigation.navigate("Event Details", {
                            eventNumber: 123,
                            eventSuburb: "Hornsby"
                        });
                    }}
                >
                    View Today's Events
                </Button>

                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Athletics</Button>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Today</Button>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Fitness</Button>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Music</Button>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Social</Button>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Outdoors</Button>
                    <Button mode="contained" style={{ marginHorizontal: 4 }} labelStyle={{ fontSize: theme.fontSizes.body }}>Family</Button>
                </View>

            </View>

            <View style={{ flex: 1 }}>
                {offline && (
                    <View>
                        <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.onSurface }}>
                            Text offline mode
                        </Text>
                    </View>
                )}

                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() =>
                                props.navigation.navigate("Event Details", { event: item, offline })
                            }
                        >
                            <View
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderWidth: 1,
                                    borderColor: theme.colors.outline,
                                    borderRadius: 8,
                                    backgroundColor: theme.colors.surface
                                }}
                            >
                                <Text style={{ fontSize: theme.fontSizes.title, fontWeight: "bold", color: theme.colors.onSurface }}>
                                    {item?.title}
                                </Text>

                                <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.onSurface }}>
                                    {item?.date}
                                </Text>

                                <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.onSurface }}>
                                    {item?.location}
                                </Text>

                                <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.onSurface }}>
                                    {item?.spotsRemaining}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default EventsListsScreen;