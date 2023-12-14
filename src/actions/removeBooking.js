import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ACCESS_TOKEN, API_BASE_URL } from '../constants/env';
import { fetchBookings } from './fetchBookings';

export const removeBooking = createAsyncThunk(
  'removeBooking',
  async ( id , { dispatch }) => {
    try {
      const queryString = new URLSearchParams({ authToken: API_ACCESS_TOKEN }).toString(); 
      const response =  await fetch(`${API_BASE_URL}/bookings/delete/${id}?${queryString}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove booking');
      }

    } catch (error) {
      console.error('Error removing booking:', error.message);
    } 
  }
);