import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import bcrypt from "bcryptjs";

import { addUserToFirestore, checkUserFirebase } from "./firebase";
import { addUserToSqlite, checkUserSqlite } from "./db";

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
    if (firebaseResponse) {
      return userData;
    } else {
      return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
    }
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
      if (userSqlite.email === userData.email) {
        console.log("Usuario ya existe en base de datos");
        if (userFirebase.password === hashedPassword) {
          return userData;
        } else {
          return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
        }
      } else {
        if (userFirebase.password === hashedPassword) {
          addUserToSqlite({ ...userData, password: hashedPassword });
          return userData;
        } else {
          console.log("Error en datos de usuario");
          return thunkAPI.rejectWithValue("Error al cargar los datos de usuario");
        }
      }
    } else {
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
        console.log("Error al cargar los datos de usuario", state);
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
        console.log("Error al agregar el usuario", state);
      });
  },
});

export default userSlice.reducer;
