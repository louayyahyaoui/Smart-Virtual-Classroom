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
  
    return promise.data.result.reqFiles[0].url;
  }
);

export const UploadResume = createAsyncThunk(
  "users/UploadResume",

  async (resume) => {
    const promise = await axios.post(
      "https://closer-server.herokuapp.com/courses/api/upload",
      resume
    );
  
    return promise.data.result.reqFiles[0].url;
  }
);

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const { data } = await axios.get(
    "https://closer-server.herokuapp.com/api/getUserById/" + id
  );

  return data;
});



export const getUserDataById = createAsyncThunk("users/getuserdata", async (id) => {
  const { data } = await axios.get(
    "http://localhost:5000/api/getuserdata/" + id
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
    UserDataById: null,
    statusChangePassword: null,
    userUpdated: false,
    resume: ""
  },

  extraReducers: {
    [UpdateProfilePicture.fulfilled]: (state, action) => {
      state.Resources = action.payload;
    },
    [UploadResume.fulfilled]: (state, action) => {
      state.resume = action.payload;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.UserById = action.payload;
      state.Resources = state.UserById.picture;
    },
    [getUserDataById.fulfilled]: (state, action) => {
      state.UserDataById = action.payload;
      //state.Resources = state.UserById.picture;
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
