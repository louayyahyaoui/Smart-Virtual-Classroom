import { createSlice } from "@reduxjs/toolkit";
import { CommentsApi } from "../../api/api";

let initialState = {
  comments: [],
  errors: "",
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    addComments: (state, action) => {
      const payload = action.payload;
      state.comments.push(payload);
    },
  },
});

export const fetchCommentsCourse = (id) => async (dispatch) => {
  const res = CommentsApi.getCommentsCourse(id);

  res.then((data) => {
    dispatch(setComments(data));
  });
};
export const fetchCommentsTask = (id) => async (dispatch) => {
    const res = CommentsApi.getCommentsTask(id);
  
    res.then((data) => {
      dispatch(setComments(data));
    });
  };
  
export const selectComments = (state) => {
  return [state.comments.comments, state.comments.errors];
};

export const { setComments, setErrors, addComments } = commentSlice.actions;
export default commentSlice.reducer;
