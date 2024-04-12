import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    value: 0,
  },
  reducers: {
    setStats: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStats } = statsSlice.actions;

export default statsSlice.reducer;