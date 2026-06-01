import { StyleSheet, View } from 'react-native';
import { Text, Button, ActivityIndicator, Surface, Divider } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../services/apiService';

const EventDetailsScreen = ({ route, navigation }) => {
    const { event, offline } = route.params;
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
                if (error) {
                    setError(error)
                }
                else {
                    setEventDetails(fetchEvent)
                }
            } catch (error) {
                setError("Failed to load details")
            }
            finally {
                setLoading(false)
            }
        }

        loadDetails();
    }, []);

    if (loading) {
        return <ActivityIndicator> style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}</ActivityIndicator>
    }

    return (
        <Surface style={{ flex: 1, padding: 20 }} elevation={5}>
            <Surface elevation={0}>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>

                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold", alignItems: 'flex-start' }}></Text>
                    </View>

                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{eventDetails.title}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>Category:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.category}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>Date:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.date}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>Description:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.description}</Text>
                    </View>
                </View>

                <Divider />

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>Capacity:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.capacity}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>Location:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.location}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>StartTime:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.startTime}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ width: "40%", paddingVertical: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>EndTime:</Text>
                    </View>
                    <View style={{ width: "60%", paddingVertical: 4 }}>
                        <Text>{eventDetails.endTime}</Text>
                    </View>
                </View>

                <Divider />
            </Surface>

            <View style={{ flexDirection: "row", flexWrap: 'wrap', gap: 30, justifyContent: 'center' }}>

                <Button mode="contained" onPress={() => navigation.goBack()}>
                    Back
                </Button>

                <Button icon="camera" mode="contained" onPress={() => navigation.navigate("Event Registration", { event: eventDetails })}
                    disable={offline || eventDetails.spotsRemaining <= 0 || eventDetails.isCancelled} >
                    Register
                </Button>
            </View>
        </Surface >
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