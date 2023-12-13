import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import validationReducer from '../slices/validationSlice';
import airportsReducer from '../slices/airportsSlice';
import bookingReducer from '../slices/bookingsSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    validation: validationReducer,
    airports: airportsReducer,
    bookings: bookingReducer,
  },
});

export default store;