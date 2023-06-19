import { FIREBASE_REALTIME_DB_URL } from "../../constants";

export const fetchStoresFromFirestore = async () => {
  try {
    const storesData = await fetch(`${FIREBASE_REALTIME_DB_URL}/stores.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const storesObject = await storesData.json();
    return Object.entries(storesObject).map(([id, value]) => ({
      id,
      ...value,
    }));
  } catch (error) {
    throw new Error("Error al obtener las tiendas de Firestore");
  }
};

export const addStoreToFirestore = async (storeData) => {
  try {
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
  } catch (error) {
    throw new Error("Error al agregar la tienda a Firestore");
  }
};

export const addUserToFirestore = async (userData) => {
  try {
    const response = await fetch(`${FIREBASE_REALTIME_DB_URL}/users.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Error al agregar el usuario a Firestore");
    }
    const responseData = await response.json();
    return {
      id: responseData.name,
    };
  } catch (error) {
    throw new Error("Error al agregar el usuario a Firestore");
  }
};

export const checkUserFirebase = async (email) => {
  try {
    const response = await fetch(`${FIREBASE_REALTIME_DB_URL}/users.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios de Firestore");
    }
    const responseData = await response.json();
    const users = Object.values(responseData);
    const matchedUsers = users.filter((user) => user.email === email);
    return matchedUsers;
  } catch (error) {
    console.error(`Error al verificar el usuario en Firestore: ${error.message}`);
    return [];
  }
};

export const checkPasswordFirebase = async (userData) => {
  try {
    const queryParams = `?orderBy="email"&equalTo="${userData.email}"`;

    const response = await fetch(`${FIREBASE_REALTIME_DB_URL}/users.json${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios de Firestore");
    }

    const responseData = await response.json();
    const matchedUser = Object.values(responseData)[0];

    if (!matchedUser) {
      throw new Error("Usuario no encontrado");
    }

    if (matchedUser.password === userData.password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error al verificar el usuario en Firestore");
  }
};
