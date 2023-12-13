import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  firstName: "",
  lastName: "",
  departureAirport: "",
  destinationAirport: "",
  departureDate: "",
  dateOfReturn: "",
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export const selectForm = (state) => state.form
export default formSlice.reducer;