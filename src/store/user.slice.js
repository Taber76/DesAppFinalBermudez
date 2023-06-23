import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import bcrypt from "bcryptjs";

import { addUserToFirestore, checkUserFirebase, checkPasswordFirebase } from "./firebase";
import { addUserToSqlite, checkUserSqlite, logoutSqlite } from "./db";

const initialState = {
  user: {},
  isLogged: false,
  isLoading: false,
};

export const loadUser = createAsyncThunk("user/loadUser", async (_, thunkAPI) => {
  try {
    const userData = await checkUserSqlite();
    if (userData.length === 0) {
      return thunkAPI.rejectWithValue("No hay usuario logueado");
    }

    const firebaseResponse = await checkPasswordFirebase(userData);
    if (firebaseResponse.response) {
      return userData;
    } else {
      return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
    }
  } catch (error) {
    console.log("Error al cargar los datos de usuario", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk("user/login", async (userData, thunkAPI) => {
  try {
    const firebaseResponse = await checkPasswordFirebase(userData);
    if (firebaseResponse.response) {
      await addUserToSqlite({ ...userData, username: firebaseResponse.username });
      return { ...userData, username: firebaseResponse.username };
    }
    return thunkAPI.rejectWithValue("No existe el usuario en la base de datos");
  } catch (error) {
    console.log("Error al cargar los datos de usuario", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("user/logout", async (email, thunkAPI) => {
  try {
    await logoutSqlite(email);
    return;
  } catch (error) {
    console.log("Error al cargar los datos de usuario", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addUser = createAsyncThunk("user/addUser", async (userData, thunkAPI) => {
  try {
    const userFirebase = await checkUserFirebase(userData.email);
    const userSqlite = await checkUserSqlite();
    const hashedPassword = userData.password; //bcrypt.hashSync(userData.password, 10);
    if (userFirebase.length !== 0) {
      // Email in Firebase?

      if (userSqlite.email === userData.email) {
        // Email in SQLite?
        console.log("Usuario ya existe en base de datos");

        if (userFirebase.password === hashedPassword) {
          // Password right?
          return userData;
        } else {
          return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
        }
      } else {
        // Email in Firebase but not in SQLite
        if (userFirebase[0].password === hashedPassword) {
          addUserToSqlite({ ...userData, password: hashedPassword });
          return userData;
        } else {
          console.log("Error en datos de usuario");
          return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
        }
      }
    } else {
      // Email not in Firebase
      await addUserToFirestore({ ...userData, password: hashedPassword });
      await addUserToSqlite({ ...userData, password: hashedPassword });
      return userData;
    }
  } catch (error) {
    console.error("Error al cargar los datos de usuario", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        console.log("No hay usuario logueado [Slice]", state);
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        console.log("Error al cargar los datos de usuario [Slice]", state);
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        console.log("Error al desloguear el usuario [Slice]", state);
      })

      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.isLoading = false;
        console.log("Error al agregar el usuario [Slice]", state);
      });
  },
});

export default userSlice.reducer;
