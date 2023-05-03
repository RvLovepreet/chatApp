import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addKey: (state, action) => {
      return (state = action.payload);
    },
    removeKey: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { addKey, removeKey } = userSlice.actions;
export default userSlice.reducer;
