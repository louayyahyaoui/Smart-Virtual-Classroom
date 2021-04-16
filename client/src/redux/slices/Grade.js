import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const rendreTask = createAsyncThunk("Task/rendreTask", async (grade) => {
  const { response } = await axios.put(
    `https://closer-server.herokuapp.com/grade/rendreTask/${grade.id}`,
    grade
  );

  return response;
});
export const getDetailByTaskByStudent = createAsyncThunk(
  "Grade/getDetailByTaskByStudent",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/grade/DetailByTaskByStudent/${id}`
    );

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
    const { response } = await axios.put(
      `https://closer-server.herokuapp.com/grade/`,
      grade
    );

    return response;
  }
);
export const getTasksById = createAsyncThunk(
  "Grade/getTasksById",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/grade/${id}`
    );

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

    status: null,
  },
  extraReducers: {
    [rendreTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [rendreTask.fulfilled]: (state, action) => {
      state.grades = action.payload;
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
    [getTasksById.fulfilled]: (state, { payload }) => {
      state.grades = payload;
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
    [assignGradeToStudent.fulfilled]: (state, { payload }) => {
      state.grades = payload;
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
    [getDetailByTaskByStudent.fulfilled]: (state, { payload }) => {
      state.grades = payload;
    },
    [getDetailByTaskByStudent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default gradeSlice.reducer;
