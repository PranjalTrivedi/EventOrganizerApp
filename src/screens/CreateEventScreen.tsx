import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createEvent } from "../services/firestoreService";
import { auth } from "../services/firebase";

export default function CreateEventScreen({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!title || !description || !date || !location) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await createEvent({
        title,
        description,
        date,
        location,
        isFavorite: false,
        createdBy: auth.currentUser?.uid,
        createdAt: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (error) {
      console.error("Create event error:", error);
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Event</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g. May 15, 2023)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <Button
        title={loading ? "Creating..." : "Create Event"}
        onPress={handleCreateEvent}
        disabled={loading}
      />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
