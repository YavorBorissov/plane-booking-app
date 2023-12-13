import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBookings } from '../slices/bookingSlice';
import { API_BASE_URL } from '../constants/env';

export const fetchBookings = createAsyncThunk(
  'fetchBookings',
  async (_, { dispatch }) => {
    try {
      const response =  await fetch(`${API_BASE_URL}/bookings`);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const bookingsData = await response.json();
      dispatch(setBookings(bookingsData));
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  }
);