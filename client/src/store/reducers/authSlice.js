import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";
import { getUserService, loginService, regsiterService } from "../../services";
import { setAuthToken } from "../../utils";

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      // Lây data
      const data = await loginService(formData);

      // Lưu token
      localStorage.setItem(config.constants.TOKEN_NAME, data.data.token);

      setAuthToken(localStorage.getItem(config.constants.TOKEN_NAME));

      // Trả về user
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      // Lây data
      const res = await regsiterService(formData);

      const data = await loginService({
        phone: formData.phone,
        password: formData.password,
      });

      // Lưu token
      localStorage.setItem(config.constants.TOKEN_NAME, data.data.token);

      setAuthToken(localStorage.getItem(config.constants.TOKEN_NAME));

      // Trả về user
      return data.data.user;

      // Trả về user
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (rejectWithValue) => {
    // Gán token vào header
    if (localStorage.getItem(config.constants.TOKEN_NAME)) {
      setAuthToken(localStorage.getItem(config.constants.TOKEN_NAME));
    }
    try {
      // Lấy data
      const data = await getUserService();

      // Trả về payload
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem(config.constants.TOKEN_NAME);
  setAuthToken(null);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    authMsg: null,
  },
  reducer: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.authMsg = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.authMsg = action.payload;
    },
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.authMsg = null;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.authMsg = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [logout.fulfilled]: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Reducer
const authReducer = authSlice.reducer;

// Actions
// export const {  } = authSlice.actions;

// Selector
export const authSelector = (state) => state.authReducer;

// Export reducer
export default authReducer;
