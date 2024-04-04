import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload)
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  preloadedState: {},
});

export const persistor = persistStore(store);

export const { setUser, clearUser } = userSlice.actions;
