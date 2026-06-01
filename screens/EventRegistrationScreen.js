import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Surface, TextInput, Divider, Banner } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { registerForEvent } from '../services/apiService';

const EventRegistrationScreen = ({ route, navigation }) => {
    const { event } = route.params;
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        if (!name || !email) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const result = await registerForEvent(event.id, name, email);
            if (result.success) {
                setSuccess(true);
                event.spotsRemaining -= 1;
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Events List" }],
                    });
                }, 1500);
            } else {
                setError(result.message || "Registration failed")
            }
        } catch (error) {
            setError("Failed to register");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Surface style={{ flex: 1, padding: 16 }}>
            <ScrollView style={{ padding: 16, borderRadius: 12 }} elevation={4}>

                <View>

                    <Text
                        style={{ fontSize: 22, fontWeight: "bold", textAlign: "left", marginBottom: 10, marginLeft: 4 }}>
                        Register for: {event.title}
                    </Text>

                    <Text style={{ marginBottom: 8 }}>Available Spots: {event.spotsRemaining}
                    </Text>

                    {event.spotsRemaining <= 0 && (
                        <Banner visible style={{ backgroundColor: "#fff308", marginVertical: 10 }}>
                            Sorry, no spots are available for this event.
                        </Banner>
                    )}

                    <View style={{ marginBottom: 20 }}>

                        <TextInput
                            label="Name" value={name} mode="outlined" onChangeText={setName} style={{ backgroundColor: "white", marginBottom: 12 }}
                            disabled={event.spotsRemaining <= 0} />
                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <TextInput
                            label="Email" value={email} mode="outlined" onChangeText={setEmail} style={{ backgroundColor: "white", marginBottom: 12 }}
                            disabled={event.spotsRemaining <= 0} keyboardType='email-address' />

                    </View>

                    {error && <Text style={{ color: "red", marginBottom: 12 }}>{error}
                    </Text>}
                    {success && <Text style={{ color: "green", marginBottom: 12 }}>Registration successful!</Text>}

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>

                        <Button mode="outlined" onPress={() => navigation.goBack()}>
                            Cancel
                        </Button>

                        <Button
                            mode="contained"
                            icon="check"
                            onPress={handleRegister}
                        >
                            Register
                        </Button>

                    </View>

                </View>
            </ScrollView>
        </Surface>
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