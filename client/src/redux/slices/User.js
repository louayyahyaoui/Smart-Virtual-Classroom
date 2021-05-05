import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isAuth } from "../../helpers/auth";

export const UpdateProfilePicture = createAsyncThunk(
  "users/UpdateProfilePicture",

  async (resources) => {
    const promise = await axios.post(
      "https://closer-server.herokuapp.com/courses/api/upload",
      resources
    );
    console.log(promise.data.result.reqFiles);
    return promise.data.result.reqFiles[0].url;
  }
);

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const { data } = await axios.get(
    "https://closer-server.herokuapp.com/api/getUserById/" + id
  );

  return data;
});

export const ChangePassword = createAsyncThunk(
  "users/ChangePassword",
  async (object) => {
    const { data } = await axios.post(
      "https://closer-server.herokuapp.com/api/ChangePassword/",
      object
    );

    return data;
  }
);

export const UpdateUserState = createAsyncThunk(
  "users/UpdateUserState",
  async () => {}
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    Resources: "",
    UserById: null,
    statusChangePassword: null,
    userUpdated: false,
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
    [UpdateUserState.fulfilled]: (state, action) => {
      state.userUpdated = !state.userUpdated;
    },
  },
});
export default UserSlice.reducer;
