import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: { key: '' },
  reducers: {
    addKey: (state, action) => {
      console.log(action.payload, 'hello in add key');
      console.log(state, 'hello in add key');
      state.key = action.payload;
      return state;
    },
    removeKey: (state, action) => {
      console.log(state.key, 'hello');
      state.key = action.payload;
      return state;
    },
  },
});
export const { addKey, removeKey } = userSlice.actions;
export default userSlice.reducer;
