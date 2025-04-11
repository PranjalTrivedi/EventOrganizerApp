import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { getEvents } from "../services/firestoreService";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  isFavorite: boolean;
};

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData as Event[]);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.date}</Text>
      <Button
        title="View Details"
        onPress={() =>
          navigation.navigate("EventDetails", { eventId: item.id })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Button
        title="Create Event"
        onPress={() => navigation.navigate("CreateEvent")}
      />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>{loading ? "Loading..." : "No events found"}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
