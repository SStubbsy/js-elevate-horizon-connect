import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, TextInput, Banner } from 'react-native-paper';
import React, { useState } from 'react';
import { registerForEvent } from '../services/apiService';
import { useAppPreferences } from '../components/AppPreferencesContext';

const EventRegistrationScreen = ({ route, navigation }) => {
    const { event } = route.params;
    const { theme } = useAppPreferences();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
                setError(result.message || "Registration failed");
            }
        } catch {
            setError("Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Surface style={{ flex: 1, padding: 16, backgroundColor: theme.colors.surface }}>
            <ScrollView
                style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: theme.colors.surface
                }}
                elevation={4}
            >
                <View>

                    <Text
                        style={{
                            fontSize: theme.fontSizes.title,
                            fontWeight: "bold",
                            textAlign: "left",
                            marginBottom: 10,
                            marginLeft: 4,
                            color: theme.colors.onSurface
                        }}
                    >
                        Register for: {event.title}
                    </Text>

                    <Text
                        style={{
                            marginBottom: 8,
                            fontSize: theme.fontSizes.body,
                            color: theme.colors.onSurface
                        }}
                    >
                        Available Spots: {event.spotsRemaining}
                    </Text>

                    {event.spotsRemaining <= 0 && (
                        <Banner
                            visible
                            style={{
                                backgroundColor: theme.colors.errorContainer,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{ color: theme.colors.onErrorContainer }}>
                                Sorry, no spots are available for this event.
                            </Text>
                        </Banner>
                    )}

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Name"
                            value={name}
                            mode="outlined"
                            onChangeText={setName}
                            disabled={event.spotsRemaining <= 0}
                            style={{
                                marginBottom: 12,
                                backgroundColor: theme.colors.surface
                            }}
                            textColor={theme.colors.onSurface}
                            outlineColor={theme.colors.outline}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Email"
                            value={email}
                            mode="outlined"
                            onChangeText={setEmail}
                            disabled={event.spotsRemaining <= 0}
                            keyboardType="email-address"
                            style={{
                                marginBottom: 12,
                                backgroundColor: theme.colors.surface
                            }}
                            textColor={theme.colors.onSurface}
                            outlineColor={theme.colors.outline}
                        />
                    </View>

                    {error && (
                        <Text
                            style={{
                                color: theme.colors.error,
                                marginBottom: 12,
                                fontSize: theme.fontSizes.body
                            }}
                        >
                            {error}
                        </Text>
                    )}

                    {success && (
                        <Text
                            style={{
                                color: theme.colors.primary,
                                marginBottom: 12,
                                fontSize: theme.fontSizes.body
                            }}
                        >
                            Registration successful!
                        </Text>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 10
                        }}
                    >
                        <Button
                            mode="outlined"
                            onPress={() => navigation.goBack()}
                            labelStyle={{ fontSize: theme.fontSizes.body }}
                        >
                            Cancel
                        </Button>

                        <Button
                            mode="contained"
                            icon="check"
                            onPress={handleRegister}
                            loading={loading}
                            disabled={
                                event.spotsRemaining <= 0 ||
                                loading
                            }
                            labelStyle={{ fontSize: theme.fontSizes.body }}
                        >
                            Register
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </Surface>
    );
};

export default EventRegistrationScreen;
