export const storageKey = "loggedInUser";
const userDataString: string | null = localStorage.getItem(storageKey);
export const userData = userDataString ? JSON.parse(userDataString) : null;
