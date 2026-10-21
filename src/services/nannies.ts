import { ref, get, push } from "firebase/database";
import { database } from "./firebase";
import type { AppointmentPayload } from "../types/appointment";
import type { Nanny } from "../types/nanny";

export const fetchNannies = async () => {
  try {
    const dbRef = ref(database, "/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("RAW DATA FROM FIREBASE:", data);

      if (Array.isArray(data)) {
        return data.map((item, index) => ({
          ...item,
          id: item.id || String(index),
        }));
      }

      return Object.entries(data)
        .filter(([key]) => key !== "appointments")
        .map(([key, value]) => ({
          ...(value as object),
          id: key,
        }));
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

export const getFilteredAndSortedNannies = (
  nannies: Nanny[],
  selectedFilter: string,
) => {
  let result = [...nannies];

  switch (selectedFilter) {
    case "A to Z":
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      break;
    case "Z to A":
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      break;
    case "Price: Low to High":
      result.sort((a, b) => a.price_per_hour - b.price_per_hour);
      break;
    case "Price: High to Low":
      result.sort((a, b) => b.price_per_hour - a.price_per_hour);
      break;
    case "Popular":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "Not popular":
      result.sort((a, b) => a.rating - b.rating);
      break;
    case "Show all":
    default:
      break;
  }

  return result;
};
