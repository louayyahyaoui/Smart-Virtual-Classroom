import { createSlice } from "@reduxjs/toolkit";
import {  UserDataApi } from "../../api/api";

let initialState = {
  userdates: [],
  errors: "",
};

const userdataSlice = createSlice({
  name: "userdates",
  initialState,
  reducers: {
    getUserDatas(state, action) {
      state.userdates = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchuserdata = () => async (dispatch) => {
  const res = UserDataApi.getUserdata();
  res.then((data) => {
    dispatch(getUserDatas(data));
  });
};
export const selectuserdata = (state) => {
    return [state.userdata.userdates.data, state.userdata.errors];
  };
export const {
    getUserDatas,
  
} = userdataSlice.actions;
export default userdataSlice.reducer;
