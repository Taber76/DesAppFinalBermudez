import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    console.log("Error al cargar los datos de Frebase", error);
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
    const filteredStores = initialState.stores.filter((store) => store.category === category);
    return filteredStores;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addStore = createAsyncThunk("store/addStore", async (storeData, thunkAPI) => {
  try {
    const newStore = await addStoreToFirestore(storeData);
    return newStore;
  } catch (error) {
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
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      });
  },
});

export default storesSlice.reducer;
