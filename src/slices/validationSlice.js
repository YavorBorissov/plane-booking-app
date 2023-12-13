import { createSlice } from '@reduxjs/toolkit';

const validationSlice = createSlice({
  name: 'validation',
  initialState: {},
  reducers: {
    setValidationError: (state, action) => {
      const { fieldName, errorMessage } = action.payload;
      return { ...state, [fieldName]: errorMessage };
    },
    clearValidationError: (state, action) => {
      const { fieldName } = action.payload;
      const newState = { ...state };
      delete newState[fieldName];
      return newState;
    },
  },
});

export const { setValidationError, clearValidationError } = validationSlice.actions;
export const selectValidationErrors = (state) => state.validation;
export default validationSlice.reducer;