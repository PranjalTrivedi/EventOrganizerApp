let mockEvents = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2023-11-15",
    description: "Weekly team sync",
    attendees: ["user1@example.com"],
  },
  {
    id: "2",
    title: "Product Launch",
    date: "2023-11-20",
    description: "New feature release",
    attendees: ["user1@example.com", "user2@example.com"],
  },
];

export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEvents);
    }, 500);
  });
};

export const createEvent = async (event: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent = { ...event, id: Date.now().toString() };
      mockEvents.push(newEvent);
      resolve(newEvent);
    }, 500);
  });
};

export const getEventById = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEvents.find((e) => e.id === id));
    }, 300);
  });
};
