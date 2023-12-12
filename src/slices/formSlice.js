import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    // Define initial state for form data here
    firstName: '',
    lastName: '',
    departureAirport: '',
    destinationAirport: '',
    departureDate: '',
    returnDate: '',
  },
  reducers: {
    updateForm: (state, action) => {
      // Update form state based on action payload
      return { ...state, ...action.payload };
    },
    // Add other form-related reducers as needed
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;