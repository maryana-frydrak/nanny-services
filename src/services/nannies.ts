import { ref, get, push } from "firebase/database";
import { database } from "./firebase";
import type { AppointmentPayload } from "../types/appointment";

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

export const addAppointment = async (appointmentData: AppointmentPayload) => {
  try {
    const appointmentsRef = ref(database, "appointments");
    await push(appointmentsRef, {
      ...appointmentData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};
