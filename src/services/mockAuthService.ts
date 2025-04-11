export const signIn = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { email, uid: "mock-user-id" } });
    }, 1000);
  });
};

export const signUp = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { email, uid: "mock-user-id" } });
    }, 1000);
  });
};

export const signOut = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
};
