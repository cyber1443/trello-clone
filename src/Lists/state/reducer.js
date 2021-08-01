import {createSlice} from '@reduxjs/toolkit';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    isLoading: true,
    lists: [],
    cards: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
      state.isLoading = false;
    },
    addCard: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
    addList: (state, action) => {
      state.lists = [...state.lists, action.payload];
    },
    updateCard: (state, action) => {
      const temp = state.cards.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.cards = temp;
    },
    updateList: (state, action) => {
      const temp = state.lists.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.lists = temp;
    },
    deleteList: (state, action) => {
      const temp = state.lists.filter(item =>
        item.id === action.payload.id ? null : item,
      );
      state.lists = temp;
    },
    deleteCard: (state, action) => {
      const temp = state.cards.filter(item =>
        item.id === action.payload ? null : item,
      );
      state.cards = temp;
    },
    resetState: state => {
      state.isLoading = true;
      state.lists = [];
      state.cards = [];
    },
  },
});

export const {
  setLists,
  startRefresh,
  resetState,
  setCards,
  addCard,
  addList,
  updateCard,
  updateList,
  deleteList,
  deleteCard,
} = listsSlice.actions;

export default listsSlice.reducer;
