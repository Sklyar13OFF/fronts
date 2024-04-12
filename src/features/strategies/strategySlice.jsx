import { createSlice } from '@reduxjs/toolkit';

export const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    value: 0,
  },
  reducers: {
    setStrategies: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStrategies } = strategySlice.actions;

export default strategySlice.reducer;