import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBooking } from '../slices/bookingsSlice';
import { API_ACCESS_TOKEN, API_BASE_URL } from '../constants/env';

export const fetchBooking = createAsyncThunk(
  'fetchBooking',
  async (bookingId, { dispatch }) => {
    try {
      const queryString = new URLSearchParams({ authToken: API_ACCESS_TOKEN }).toString();
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}?${queryString}`);

      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }

      const bookingData = await response.json();
      dispatch(setBooking(bookingData));
    } catch (error) {
      console.error('Error fetching booking details:', error.message);
    }
  }
);
