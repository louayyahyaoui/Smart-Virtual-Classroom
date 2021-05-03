import { createSlice } from "@reduxjs/toolkit";
import { notificationsApi } from "../../api/api";

let initialState = {
    notifications: [],
  errors: "",
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    addNotifications: (state, action) => {
      const payload = action.payload;
      state.notifications.push(payload);
    },
  },
});

export const fetchNotifications = (id) => async (dispatch) => {
  const res = notificationsApi.getNotification(id);

  res.then((data) => {
    console.log(data)
    dispatch(setNotifications(data));
  });
};

export const selectNotifications = (state) => {
  return [state.notifications.notifications, state.notifications.errors];
};

export const { setNotifications, setErrors, addNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
