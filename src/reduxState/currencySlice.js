import { createSlice } from '@reduxjs/toolkit';
import { changeCurrency, fetchCurrency } from './operetions';

const currencyInititalState = {
  baseCurrency: '',
  exchangeInfo: null,
};

export const currencySlice = createSlice({
  initialState: currencyInititalState,
  name: 'currency',
  reducers: {
    setDefaultCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(changeCurrency.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
      });
  },
});

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const { setDefaultCurrency } = currencySlice.actions;
