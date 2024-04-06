import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrency } from './operetions';

const currencyInititalState = {
  baseCurrency: '',
};

export const currencySlice = createSlice({
  initialState: currencyInititalState,
  name: 'currency',
  extraReducers: builder => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});
