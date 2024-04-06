import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './currencySlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'currency',
  version: 1,
  storage,
};

const persistedCurrencyReducer = persistReducer(
  persistConfig,
  currencySlice.reducer,
);

export const store = configureStore({
  reducer: {
    currency: persistedCurrencyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
