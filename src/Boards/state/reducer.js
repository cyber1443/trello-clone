import {createSlice} from '@reduxjs/toolkit';

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    isLoading: true,
    boards: [],
    isRefreshing: false,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
      state.isLoading = false;
      state.isRefreshing = false;
    },
    addBoard: (state, action) => {
      const temp = [...state.boards, action.payload];
      temp.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      state.boards = temp;
    },
    startRefresh: state => {
      state.isRefreshing = true;
    },
  },
});

export const {setBoards, addBoard, startRefresh} = boardsSlice.actions;

export default boardsSlice.reducer;
