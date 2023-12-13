import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  pageIndex: 0,
  pageSize: 5,
  totalCount: 0
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = [...state.bookings, ...action.payload];
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
});


export const { setBookings, setPageIndex, setTotalCount } = bookingSlice.actions;
export const selectBookings = (state) => state.bookings;
export default bookingSlice.reducer;