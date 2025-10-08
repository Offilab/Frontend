"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configureStore";
import { setRehydrated } from "./store/authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          // 👇 mark Redux as rehydrated
          store.dispatch(setRehydrated());
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
