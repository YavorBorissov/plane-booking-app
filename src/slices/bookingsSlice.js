import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  pageIndex: 0,
  pageSize: 5,
  totalCount: 0,
  booking: {},
  shouldFetchBookings: false
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = [...state.bookings, ...action.payload];
    },
    setBooking: (state, action) => {
      state.booking = action.payload
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    resetBookings: (state, action) => {
      state.bookings= []
      state.pageIndex= 0
      state.pageSize= 5
      state.totalCount= 0
    },
    setShouldFetchBookings: (state, action) => {
      state.shouldFetchBookings = !action.payload
    }
  },
});


export const { setBookings, setPageIndex, setTotalCount, resetBookings, setShouldFetchBookings, setBooking } = bookingSlice.actions;
export const selectBookings = (state) => state.bookings;
export default bookingSlice.reducer;