import { createAsyncThunk } from '@reduxjs/toolkit';
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
);
