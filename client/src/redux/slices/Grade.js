import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const rendreTask = createAsyncThunk("Task/rendreTask", async (grade) => {
  const promise = await axios.put(
    `https://closer-server.herokuapp.com/grade/rendreTask/`,
    grade
  ).then((response) => {
    console.log(response);
    const data = response.data;
    console.log(data);
    return data;
  });

const data = await promise;
return data;
});
export const getDetailByTaskByStudent = createAsyncThunk(
  "Grade/getDetailByTaskByStudent",
  async (id) => {
    const promise = await axios.get(
      `https://closer-server.herokuapp.com/grade/DetailByTaskByStudent/${id}`
    ).then((response) => {

      const data = response.data;
      console.log(data);
      return data;
    });
  
  const data = await promise;
  return data;
  }
);
export const getListQuestionTasksById = createAsyncThunk(
  "Grade/getListQuestionById",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/grade/listQuestion/${id}`
    );

    return data;
  }
);
export const assignGradeToStudent = createAsyncThunk(
  "Task/UpdateTask",
  async (grade) => {
    const promise = await axios.put(
      `https://closer-server.herokuapp.com/grade/`,
      grade
    ).then((response) => {
      const data = response.data;
      return data;
    });
  
  const data = await promise;
  return data;
  }
);
export const getTasksById = createAsyncThunk(
  "Grade/getTasksById",
  async (taskDetail) => {
    const promise = await axios.get(
      `https://closer-server.herokuapp.com/grade?idUser=${taskDetail.idUser}&idClass=${taskDetail.idClass}`
    ).then((response) => {
      const data = response.data;
      return data;
    });
  
  const data = await promise;
  return data;
  }
);

export const getGrades = createAsyncThunk("Grade/getgrade", async () => {
  const { data } = await axios.get("https://closer-server.herokuapp.com/grade");

  return data;
});

export const postGrades = createAsyncThunk(
  "Grade/posteGrade",
  async (grade) => {
    const { response } = await axios.post(
      "https://closer-server.herokuapp.com/grade",
      grade
    );

    return response.data;
  }
);

export const gradeSlice = createSlice({
  name: "Grade",
  initialState: {
    grades: [],
    listQuestion: [],
      grade : {},
    status: null,
  },
  extraReducers: {
    [rendreTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [rendreTask.fulfilled]: (state, action) => {
      const index = state.grades.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.grades[index] = action.payload;
        state.status = "success";
      }
       
    },
    [rendreTask.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getGrades.pending]: (state, action) => {
      state.status = "loading";
    },
    [getGrades.fulfilled]: (state, { payload }) => {
      state.grades = payload;
      state.status = "success";
    },
    [getGrades.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getTasksById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTasksById.fulfilled]: (state, action) => {
      state.grades = action.payload;
      state.status = "success";
    },
    [getTasksById.rejected]: (state, action) => {
      state.status = "failed";
    },

    postGrades: (state, action) => {
      state.grades.push(action.payload);
    },
    [assignGradeToStudent.pending]: (state, action) => {
      state.status = "loading";
    },
    [assignGradeToStudent.fulfilled]: (state,  action) => {
      const payload = action.payload;
      const index = state.grades.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.grades[index] = payload;
        state.status = "success";
      }
    },
    [assignGradeToStudent.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getListQuestionTasksById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getListQuestionTasksById.fulfilled]: (state, action) => {
      //console.log(action.payload);
      state.listQuestion = action.payload[0].task.listQuestion;
    },
    [getListQuestionTasksById.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getDetailByTaskByStudent.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDetailByTaskByStudent.fulfilled]: (state, action) => {
      //console.log( action.payload);
      state.grades = action.payload;
      state.status = "success";
    },
    [getDetailByTaskByStudent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default gradeSlice.reducer;
