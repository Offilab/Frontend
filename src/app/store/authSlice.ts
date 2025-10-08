import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id:string
  fullname: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  rehydrated: boolean; // 👈 new
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  rehydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    setRehydrated: (state) => {
      state.rehydrated = true;
    },
  },
});

export const { loginSuccess, logout, setRehydrated } = authSlice.actions;
export default authSlice.reducer;
