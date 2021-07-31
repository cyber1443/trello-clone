import {createSlice} from '@reduxjs/toolkit';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    isLoading: true,
    lists: [],
    cards: [],
    isRefreshing: false,
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
      state.isLoading = false;
    },
    addList: (state, action) => {
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
    resetState: state => {
      state.isLoading = true;
      state.lists = [];
      state.isRefreshing = false;
    },
  },
});

export const {setLists, addList, startRefresh, resetState, setCards} =
  listsSlice.actions;

export default listsSlice.reducer;
