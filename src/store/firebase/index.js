import { FIREBASE_REALTIME_DB_URL } from "../../constants";

export const fetchStoresFromFirestore = async () => {
  const storesData = await fetch(`${FIREBASE_REALTIME_DB_URL}/stores.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const storesOject = await storesData.json();
  return Object.entries(storesOject).map(([id, value]) => ({
    id,
    ...value,
  }));
};

export const addStoreToFirestore = async (storeData) => {
  const response = await fetch(`${FIREBASE_REALTIME_DB_URL}/stores.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeData),
  });
  if (!response.ok) {
    throw new Error("Error al agregar la tienda a Firestore");
  }

  const responseData = await response.json();
  return {
    id: responseData.name,
  };
};
