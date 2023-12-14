import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBookings, setTotalCount } from '../slices/bookingsSlice';
import { API_ACCESS_TOKEN, API_BASE_URL } from '../constants/env';

export const fetchBookings = createAsyncThunk(
  'fetchBookings',
  async ({ pageIndex, pageSize }, { dispatch }) => {
    try {
      const queryString = new URLSearchParams({ pageIndex, pageSize, authToken: API_ACCESS_TOKEN }).toString(); 
      const response =  await fetch(`${API_BASE_URL}/bookings?${queryString}`);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const bookingsData = await response.json();
      dispatch(setBookings(bookingsData.list));
      dispatch(setTotalCount(bookingsData.totalCount));
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  }
);