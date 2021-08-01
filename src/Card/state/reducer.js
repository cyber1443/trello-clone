import {createSlice} from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    isLoading: true,
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    addComment: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    deleteComment: (state, action) => {
      const temp = state.comments.filter(item =>
        item.id === action.payload ? null : item,
      );
      state.comments = temp;
    },
    updateComment: (state, action) => {
      const temp = state.comments.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.comments = temp;
    },
    resetState: state => {
      state.isLoading = true;
      state.comments = [];
    },
  },
});

export const {
  setComments,
  addComment,
  updateComment,
  deleteComment,
  resetState,
} = commentsSlice.actions;

export default commentsSlice.reducer;
