import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  isFavorite: boolean;
  createdBy?: string;
  createdAt?: any;
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    return eventSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Ensure all required fields have values
      const event: Event = {
        id: doc.id,
        title: data.title || "Untitled Event",
        description: data.description || "No description",
        date: data.date || "No date specified",
        isFavorite: data.isFavorite || false,
        ...(data.location && { location: data.location }),
        ...(data.createdBy && { createdBy: data.createdBy }),
        ...(data.createdAt && { createdAt: data.createdAt }),
      };
      return event;
    });
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

export const createEvent = async (
  eventData: Omit<Event, "id">
): Promise<Event> => {
  try {
    const eventsCollection = collection(db, "events");
    const docRef = await addDoc(eventsCollection, eventData);
    return {
      id: docRef.id,
      ...eventData,
    };
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "Untitled Event",
        description: data.description || "No description",
        date: data.date || "No date specified",
        isFavorite: data.isFavorite || false,
        ...(data.location && { location: data.location }),
        ...(data.createdBy && { createdBy: data.createdBy }),
        ...(data.createdAt && { createdAt: data.createdAt }),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting event:", error);
    throw error;
  }
};

export const toggleEventFavorite = async (
  id: string,
  isFavorite: boolean
): Promise<void> => {
  try {
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, { isFavorite });
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
