import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ACCESS_TOKEN, API_BASE_URL } from '../constants/env';

export const createBooking = createAsyncThunk(
  'createBooking',
  async (bookingData, { dispatch }) => {
    try {
      const queryString = new URLSearchParams({ authToken: API_ACCESS_TOKEN }).toString(); 
      const response =  await fetch(`${API_BASE_URL}/bookings/create?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('Error creating booking:', error.message);
      throw error;
    }
  }
);
