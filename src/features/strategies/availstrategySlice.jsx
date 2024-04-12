import { createSlice } from '@reduxjs/toolkit';

export const availstrategySlice = createSlice({
  name: 'availstrategies',
  initialState: {
    value: 0,
  },
  reducers: {
    setAvailStrategies: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAvailStrategies } = availstrategySlice.actions;

export default availstrategySlice.reducer;