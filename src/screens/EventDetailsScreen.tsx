import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  getEventById,
  toggleEventFavorite,
} from "../services/firestoreService";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isFavorite: boolean;
};

export default function EventDetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { eventId } = route.params;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData as Event | null);
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const toggleFavorite = async () => {
    if (!event) return;

    try {
      await toggleEventFavorite(event.id, !event.isFavorite);
      setEvent({
        ...event,
        isFavorite: !event.isFavorite,
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.location}>{event.location}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Button
        title={event.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={toggleFavorite}
      />

      <Button title="Back to Events" onPress={() => navigation.goBack()} />
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
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
});
