import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storesReducer from "./stores.slice";

export const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
