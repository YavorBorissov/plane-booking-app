import { createSlice } from '@reduxjs/toolkit';

const airportsSlice = createSlice({
  name: 'airports',
  initialState: [],
  reducers: {
    setAirports: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAirports } = airportsSlice.actions;
export const selectAirports = (state) => state.airports;
export default airportsSlice.reducer;
