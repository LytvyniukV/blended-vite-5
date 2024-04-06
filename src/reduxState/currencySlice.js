import { createSelector, createSlice } from '@reduxjs/toolkit';
import { changeCurrency, fetchCurrency, ratesCurrency } from './operetions';

const currencyInititalState = {
  baseCurrency: '',
  exchangeInfo: null,
  rates: [],
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
      })
      .addCase(ratesCurrency.fulfilled, (state, action) => {
        state.rates = action.payload;
      });
  },
});

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const selectRates = state => state.currency.rates;

export const selectFilteredRates = createSelector(
  [selectBaseCurrency, selectRates],
  (baseCurrency, rates) => {
    return rates
      .filter(([key]) => key !== baseCurrency)
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);

export const { setDefaultCurrency } = currencySlice.actions;
