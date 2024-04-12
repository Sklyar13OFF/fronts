// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tradersReducer from '../features/traders/traderSlice';
import strategiesReducer from '../features/strategies/strategySlice';
import availstrategiesReducer from '../features/strategies/availstrategySlice';
import statsReducer from '../features/mainStats/statsSlice';
export const store = configureStore({
  reducer: {
traders:tradersReducer,
strategies: strategiesReducer,
availstrategies: availstrategiesReducer,
stats:statsReducer },
});
