import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: [],
  reducers: {
    setBookings: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBookings } = bookingSlice.actions;
export const selectBookings = (state) => state.booking;
export default bookingSlice.reducer;