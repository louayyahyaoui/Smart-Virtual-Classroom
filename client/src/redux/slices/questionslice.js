import { createSlice } from "@reduxjs/toolkit";
import { questionsApi } from "../../api/api";

let initialState = {
  questions: [],
  selectedQuestions: {},
  errors: "",
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.questions = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    addQuestion: (state, action) => {
      const payload = action.payload;
      state.questions.push(payload);
    },

    selectQuestion(state, action) {
      state.selectedQuestions = action.payload;
    },
    unselectQuestion(state) {
      state.selectedQuestions = null;
    },

    updateQuestion: (state, action) => {
      alert("hello from slices ");

      const payload = action.payload;
      alert(JSON.stringify(payload));
      const index = state.questions.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.questions[index] = payload;
      }
    },
  },
});
export const fetchQuestions = (id) => async (dispatch) => {
  const res = questionsApi.getQuestions(id);

  res.then((data) => {
    dispatch(getProducts(data));
  });
};

export const fetchQuestionsByTags = (id,tag) => async (dispatch) => {
  const res = questionsApi.getQuestionsByTags(id,tag);

  res.then((data) => {
    dispatch(getProducts(data));
  });
};
export const fetchSelectedQuestion = (data) => async (dispatch) => {
  dispatch(selectQuestion(data));
};
export const selectQuestions = (state) => {
  return [state.questions.questions, state.questions.errors];
};
export const selectOne = (state) => {
  return [state.questions.selectedQuestions, state.questions.errors];
};
export const selectOneQuestion = (id, state) => {
  console.log("state: " + state);
  console.log("id: " + id);

  return [
    state.questions.find((item) => item._id === id),
    state.questions.errors,
  ];
};
export const {
  getProducts,
  updateQuestion,
  setErrors,
  addQuestion,
  selectQuestion,
  unselectQuestion,
} = questionSlice.actions;
export default questionSlice.reducer;
