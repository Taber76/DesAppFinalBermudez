import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

import { fetchStoresFromFirestore, addStoreToFirestore } from "./firebase";

const initialState = {
  stores: [],
  selected: null,
  filteredStores: [],
  isLoading: false,
};

export const loadStores = createAsyncThunk("store/loadStores", async (_, thunkAPI) => {
  try {
    const storesData = await fetchStoresFromFirestore();
    return storesData;
  } catch (error) {
    console.log("Error al cargar los datos de Firebase", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const selectStore = createAsyncThunk("store/selectStore", (storeId, thunkAPI) => {
  try {
    return storeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const filterStores = createAsyncThunk("store/filterStores", (category, thunkAPI) => {
  try {
    const { stores } = thunkAPI.getState().store;
    if (category === "all") {
      return stores;
    }
    const filteredStores = stores.filter((store) => store.category === category);
    return filteredStores;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addStore = createAsyncThunk("store/addStore", async (storeData, thunkAPI) => {
  try {
    const fileName = `${storeData.name}.jpg`;
    const filePath = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({
      from: storeData.photoUri,
      to: filePath,
    });
    const newStore = await addStoreToFirestore({ ...storeData, photoUri: filePath });
    return newStore;
  } catch (error) {
    console.error("Error al agregar la tienda", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const storesSlice = createSlice({
  name: "store",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(loadStores.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action);
      })
      .addCase(selectStore.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(filterStores.fulfilled, (state, action) => {
        state.filteredStores = action.payload;
      })
      .addCase(addStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores.push(action.payload);
      })
      .addCase(addStore.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Error al agregar la tienda", action.error);
      });
  },
});

export default storesSlice.reducer;
