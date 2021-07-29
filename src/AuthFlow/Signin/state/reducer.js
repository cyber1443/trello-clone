import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authFlow',
  initialState: {
    authenticationFlow: 'Waiting',
  },
  reducers: {
    updateAuth: (state, action) => {
      state.authenticationFlow = action.payload;
    },
  },
});

export const {updateAuth} = authSlice.actions;

export default authSlice.reducer;
