import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import bookingReducer from '../slices/bookingSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    booking: bookingReducer,
  },
});

export default store;