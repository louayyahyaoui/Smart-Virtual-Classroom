import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuizzes = createAsyncThunk("Quiz/getQuizzes", async () => {
  const { data } = await axios.get("http://localhost:5000/quiz");

  return data;
});

export const postQuiz = createAsyncThunk("/Quiz", async (quiz) => {
  const { response } = await axios.post(
    "http://localhost:5000/quiz",
    quiz
  );

  return response.data;
});

export const quizSlice = createSlice({
  name: "Quiz",
  initialState: {
    listQuiz: [],
    status: null,
  },
  extraReducers: {
    [getQuizzes.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQuizzes.fulfilled]: (state, { payload }) => {
      state.listQuiz = payload;
      state.status = "success";
    },
    [getQuizzes.rejected]: (state, action) => {
      state.status = "failed";
    },
    postQuiz: (state, action) => {
      state.listQuiz.push(action.payload);
    },
  },
});

export default quizSlice.reducer;
