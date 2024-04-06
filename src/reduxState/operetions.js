import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, latestRates } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async crd => {
    const response = await getUserInfo({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
    return response.results[0].annotations.currency.iso_code;
  },
  {
    condition: (_, { getState }) => {
      const { baseCurrency } = getState().currency;
      return !baseCurrency;
    },
  },
);

export const changeCurrency = createAsyncThunk(
  'currency/exchangeCurrency',
  async creds => {
    const data = await exchangeCurrency(creds);
    console.log(data);
    return data;
  },
);

export const ratesCurrency = createAsyncThunk(
  'currency/ratesCurrency',
  async (_, thunkAPI) => {
    try {
      const { baseCurrency } = thunkAPI.getState().currency;
      const response = await latestRates(baseCurrency);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
