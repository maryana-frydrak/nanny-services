import { ref, get } from "firebase/database";
import { database } from "./firebase";

export const fetchNannies = async () => {
  try {
    const dbRef = ref(database, "/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("RAW DATA FROM FIREBASE:", data);

      return Array.isArray(data) ? data : Object.values(data);
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching nannies:", error);
    return [];
  }
};
