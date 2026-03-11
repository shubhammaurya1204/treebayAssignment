import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
  },
});

export default store;