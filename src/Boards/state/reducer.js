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
    deleteBoard: (state, action) => {
      const temp = state.boards.filter(item =>
        item.id === action.payload ? null : item,
      );
      state.boards = temp;
    },
    updateBoard: (state, action) => {
      const temp = state.boards.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.boards = temp;
    },
    startRefresh: state => {
      state.isRefreshing = true;
    },
  },
});

export const {setBoards, addBoard, startRefresh, deleteBoard, updateBoard} =
  boardsSlice.actions;

export default boardsSlice.reducer;
