import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAirports } from '../slices/airportsSlice';
import { API_BASE_URL } from '../constants/env';


export const fetchAirports = createAsyncThunk(
  'fetchAirports', 
  async (_, { dispatch }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/airports`);

      if (!response.ok) {
        throw new Error('Failed to fetch airports');
      }

      const airports = await response.json();
      dispatch(setAirports(airports));
    } catch (error) {
      console.error('Error fetching airports:', error.message);
    }
  }
);