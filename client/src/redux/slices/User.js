import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isAuth } from "../../helpers/auth";

export const UpdateProfilePicture = createAsyncThunk(
  "users/UpdateProfilePicture",

  async (resources) => {
    const promise = await axios.post(
      "http://localhost:5000/courses/upload",
      resources
    );
    console.log(promise.data.result.reqFiles);
    return promise.data.result.reqFiles[0];
  }
);

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const { data } = await axios.get(
    "http://localhost:5000/api/getUserById/" + id
  );

  return data;
});

export const ChangePassword = createAsyncThunk(
  "users/ChangePassword",
  async (object) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/ChangePassword/",
      object
    );

    return data;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    Resources: "",
    UserById: null,
    statusChangePassword: null,
  },

  extraReducers: {
    [UpdateProfilePicture.fulfilled]: (state, action) => {
      state.Resources = action.payload;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.UserById = action.payload;
      state.Resources = state.UserById.picture;
    },
    [ChangePassword.fulfilled]: (state, action) => {
      state.statusChangePassword = "changed !";
    },
  },
});
export default UserSlice.reducer;
