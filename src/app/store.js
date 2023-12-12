import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import validationReducer from '../slices/validationSlice';
import airportsReducer from '../slices/airportsSlice';
import bookingReducer from '../slices/bookingSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    validation: validationReducer,
    airports: airportsReducer,
    booking: bookingReducer,
  },
});

export default store;