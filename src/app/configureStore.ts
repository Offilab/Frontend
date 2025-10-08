import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Combine reducers (in case you add more slices later)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor for <PersistGate>
export const persistor = persistStore(store);

// ✅ Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
