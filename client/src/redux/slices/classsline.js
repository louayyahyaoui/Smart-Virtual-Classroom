import { createSlice } from "@reduxjs/toolkit";
import { getclassApi, ClassInvitationApi } from "../../api/api";

let initialState = {
  class: [],
  active: [],
  request: [],
  invitationclass: [],
  selectedclass: {},
  errors: "",
};

const classlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    selectClass: (state, action) => {
      state.selectedclass = action.payload;
    },
    getClasss: (state, action) => {
      state.class = action.payload;
    },
    getActive: (state, action) => {
      state.active = action.payload;
    },
    geRequest: (state, action) => {
      state.request = action.payload;
    },
    getInvitationClass: (state, action) => {
      state.invitationclass = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    addClasss: (state, action) => {
      const payload = action.payload;
      state.class.push(payload);
    },
    addInvitationClass: (state, action) => {
      const payload = action.payload;
      state.invitationclass.push(payload);
    },
    updateClasss: (state, action) => { 
      const payload = action.payload;
      const index = state.class.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.class[index] = payload;
      }
    },
  },
});
export const fetchclass = (role, iduser) => async (dispatch) => {
  if (role == "Teacher") {
    const res = getclassApi.getclassByLevel(iduser);
    res.then((data) => {
      dispatch(getClasss(data));
      console.log(data);
    });
  } else if (role === "Student") {
    const res = getclassApi.getclassByYear(iduser);
    res.then((data) => {
      dispatch(getClasss(data));
      console.log(data);
    });
  }
};
export const fetchInvitationclass = (email) => async (dispatch) => {
  const res = ClassInvitationApi.getClassInvitation(email);
  res.then((data) => {
    dispatch(getInvitationClass(data));
    console.log(data);
  });
};
export const fetchSingleClass = (data) => async (dispatch) => { 

    dispatch(selectClass(data));
};
export const fetchActiveClass = (d) => async (dispatch) => { 
  const res = getclassApi.CountActiveClass(d);
  res.then((data) => {
    dispatch(getActive(data));
    console.log(data);
  });
};
export const fetchRequestClass = (d) => async (dispatch) => { 
  const res = ClassInvitationApi.CountRequestClass(d);
  res.then((data) => {
    dispatch(geRequest(data));
    console.log(data);
  });
};
export const selectclass = (state) => {
  return [state.classs.class, state.classs.errors];
};

export const selectinvitationclass = (state) => {
  return [state.classs.invitationclass, state.classs.errors];
};
export const selectedClasses = (state) => {
  return [state.classs.selectedclass, state.classs.errors];
};
export const selectactiveclass = (state) => {
  return [state.classs.active, state.classs.errors];
};
export const selectrequestclass = (state) => {
  return [state.classs.request, state.classs.errors];
};
export const {
  getClasss,
  getInvitationClass,
  selectClass,
  setErrors,
  addClasss,
  getActive,
  geRequest,
  addInvitationClass,
  updateClasss,
} = classlice.actions;
export default classlice.reducer;