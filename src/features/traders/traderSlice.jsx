import { createSlice } from '@reduxjs/toolkit';

export const traderSlice = createSlice({
  name: 'traders',
  initialState: {
    value: 0,
  },
  reducers: {
    setTraders: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTraders } = traderSlice.actions;

export default traderSlice.reducer;