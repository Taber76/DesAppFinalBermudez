import { FIREBASE_REALTIME_DB_URL } from "../../constants";

export const fetchStoresFromFirestore = async () => {
  const storesData = await fetch(`${FIREBASE_REALTIME_DB_URL}/stores.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return storesData;
};

export const addStoreToFirestore = async (storeData) => {
  await fetch(`${FIREBASE_REALTIME_DB_URL}/stores.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeData),
  });
  const newStore = await response.json();
  return newStore;
};
