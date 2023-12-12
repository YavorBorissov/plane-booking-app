import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    // Define initial state for booking list here
    bookings: [],
  },
  reducers: {
    setBookings: (state, action) => {
      // Update booking list based on action payload
      return { ...state, bookings: action.payload };
    },
    // Add other booking-related reducers as needed
  },
});

export const { setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;