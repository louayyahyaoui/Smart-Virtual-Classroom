import { createSlice } from "@reduxjs/toolkit";
import {  RecomandationApi, UserDataApi } from "../../api/api";

let initialState = {
  recomandedcourses: [],
  errors: "",
};

const recomandationSlice = createSlice({
  name: "recomandedcourses",
  initialState,
  reducers: {
    getRecomandedCourses(state, action) {
      state.recomandedcourses = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchRecomandedCourses = (category) => async (dispatch) => {
  const res = RecomandationApi.getRecomandationCourse(category);

  res.then((data) => {
    dispatch(getRecomandedCourses(data));
  });
};
export const selectRecomandedCourses = (state) => {
    return [state.recomandation.recomandedcourses, state.recomandation.errors];
  };
export const {
    getRecomandedCourses,
  
} = recomandationSlice.actions;
export default recomandationSlice.reducer;
