import { createSlice } from "@reduxjs/toolkit";
import { answersApi } from "../../api/api";

let initialState = {
  answers: [],
  errors: "",
};

const answerSlice =createSlice({
    name:"answers",
    initialState,
    reducers:{
        getAnswers(state,action){
            state.answers=action.payload;
        },
        setErrors(state, action) {
            state.errors = action.payload;
          },
          addAnswer:(state, action) => { 
            const payload = action.payload; 
            state.answers.push(payload); 
            }, 
        },
});

export const fetchAnswers = (id) => async (dispatch) => { 
    const res =  answersApi.getAnswers(id); 

    res.then(data => {
      dispatch(getAnswers(data));
    })
   };
   export const selectAnswer = (state) => { 
 
    return [state.answers.answers, state.answers.errors]; 
   };

    
export const {
    getAnswers,
    setErrors,
    addAnswer,
  } = answerSlice.actions;
  export default answerSlice.reducer;