import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storesReducer from "./stores.slice";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
