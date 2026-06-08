import { View } from 'react-native';
import { Text, Button, ActivityIndicator, Surface, Divider } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../services/apiService';
import { useAppPreferences } from '../components/AppPreferencesContext';

const EventDetailsScreen = ({ route, navigation }) => {
    const { event, offline } = route.params;
    const { theme } = useAppPreferences();

    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDetails() {
            if (offline) {
                setEventDetails(event);
                setLoading(false);
                return;
            }

            try {
                const { event: fetchEvent, error } = await getEventById(event.id);
                if (error) setError(error);
                else setEventDetails(fetchEvent);
            } catch {
                setError("Failed to load details");
            } finally {
                setLoading(false);
            }
        }

        loadDetails();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.surface }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Surface style={{ flex: 1, padding: 20, backgroundColor: theme.colors.surface }} elevation={5}>

            <Surface
                style={{
                    padding: 10,
                    borderRadius: 12,
                    marginBottom: 20,
                    backgroundColor: theme.colors.surface
                }}
                elevation={4}
            >
                <Text
                    style={{
                        fontSize: theme.fontSizes.title,
                        fontWeight: "bold",
                        textAlign: "left",
                        marginBottom: 10,
                        marginLeft: 5,
                        color: theme.colors.onSurface
                    }}
                >
                    {eventDetails.title}
                </Text>

                {[
                    ["Category:", eventDetails.category],
                    ["Date:", eventDetails.date],
                    ["Description:", eventDetails.description],
                    ["Capacity:", eventDetails.capacity],
                    ["Spots Remaining:", eventDetails.spotsRemaining],
                    ["Location:", eventDetails.location],
                    ["Time:", `${eventDetails.startTime} - ${eventDetails.endTime}`]
                ].map(([label, value], index) => (
                    <View key={index} style={{ flexDirection: "row", marginBottom: 8 }}>
                        <View style={{ width: "40%" }}>
                            <Text style={{ fontWeight: "bold", color: theme.colors.onSurface, fontSize: theme.fontSizes.body }}>
                                {label}
                            </Text>
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text style={{ color: theme.colors.onSurface, fontSize: theme.fontSizes.body }}>
                                {value}
                            </Text>
                        </View>
                    </View>
                ))}

                <Divider style={{ marginVertical: 10, backgroundColor: theme.colors.outline }} />

            </Surface>

            <View style={{ flexDirection: "row", justifyContent: "center", gap: 30 }}>

                <Button
                    mode="outlined"
                    onPress={() => navigation.goBack()}
                    labelStyle={{ fontSize: theme.fontSizes.body }}
                >
                    Back
                </Button>

                <Button
                    icon="check"
                    mode="contained"
                    onPress={() => navigation.navigate("Events Registration", { event: eventDetails })}
                    disabled={offline || eventDetails.spotsRemaining <= 0 || eventDetails.isCancelled}
                    labelStyle={{ fontSize: theme.fontSizes.body }}
                >
                    Register
                </Button>

            </View>

        </Surface>
    );
};

export default EventDetailsScreen;
