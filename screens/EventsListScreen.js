import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Button, Searchbar, Surface } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/apiService';
import { useAppPreferences } from '../components/AppPreferencesContext';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const EventsListsScreen = (props) => {

    const { theme } = useAppPreferences();

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ["All", "Today", "Education", "Community", "Arts", "Fitness", "Technology",
        "Music", "Food", "Outdoor", "Entertainment", "Networking", "Health"]
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        let updated = [...events];
        //filter by category
        if (selectedCategory === "Today") {
            const today = new Date().toISOString().split("T")[0];
            updated = updated.filter((e) => e.date.startsWith(today));
        }
        else if (selectedCategory !== "All") {
            updated = updated.filter((e) => e.category === selectedCategory)
        }

        //filter by search text
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            updated = updated.filter((e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
        }

        setFilteredEvents(updated);
    }, [events, selectedCategory, searchQuery]);

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
        <Surface style={{ flex: 1, padding: 12 }} elevation={5}>

            {
                offline && (
                    <View style={{ backgroundColor: "yellow", padding: 10, marginBottom: 10, borderRadius: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                            You are currently offline.
                        </Text>
                    </View>
                )
            }

            {
                error && (
                    <View style={{ backgroundColor: "red", padding: 10, marginBottom: 10, borderRadius: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                            Error = {error}
                        </Text>
                    </View>
                )
            }


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

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, gap: 8 }}>
                    {
                        categories.map((cat) => (
                            <Button
                                key={cat}
                                compact={true}
                                mode={selectedCategory === cat ? "contained" : "outlined"}
                                onPress={() => setSelectedCategory(cat)}
                                style={{ marginRight: 2, marginBottom: 2 }}
                                buttonColor={selectedCategory === cat ? theme.colors.primary : theme.colors.surfaceVariant}
                                textColor={selectedCategory === cat ? "white" : theme.colors.OnSurfaceVariant}
                            >
                                {cat}
                            </Button>
                        ))
                    }
                </View>

            </View>

            <View style={{ flex: 1 }}>

                <FlatList
                    data={filteredEvents}
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
        </Surface>
    );
};

export default EventsListsScreen;