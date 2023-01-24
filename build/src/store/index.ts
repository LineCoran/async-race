import { configureStore } from '@reduxjs/toolkit';
import { garageApi } from '../api/apiSlice';
import carsReducer from './carsSlice';

const store = configureStore({
    reducer: {
        carsReducer,
        [garageApi.reducerPath]: garageApi.reducer,
    },
        middleware: (getDefaultMiddleware) => 
          getDefaultMiddleware().concat(garageApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;