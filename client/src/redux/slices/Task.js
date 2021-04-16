import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNbrTasksRemis = createAsyncThunk(
  "Task/getNbrTasksRemis",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/task/StatTaskRemis/${id}`
    );

    return data;
  }
);
export const getNbrTasksMissing = createAsyncThunk(
  "Task/getNbrTasksMissing",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/task/StatTaskMissing/${id}`
    );

    return data;
  }
);
export const getTaskByTeacher = createAsyncThunk(
  "Task/getTaskByTeacher",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/task/${id}`
    );

    return data;
  }
);

export const getDetailTask = createAsyncThunk(
  "Task/getDetailTasks",
  async (id) => {
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/task/DetailTask/${id}`
    );

    return data;
  }
);

export const getTasks = createAsyncThunk("Task/getTasks", async () => {
  const { data } = await axios.get("https://closer-server.herokuapp.com/task");

  return data;
});
export const assignTask = createAsyncThunk("Task/assignTask", async (task) => {
  const { response } = await axios.post(
    "https://closer-server.herokuapp.com/task/assign",
    task
  );

  return response.data;
});

export const postTasks = createAsyncThunk("Task/postTask", async (task) => {
  const { response } = await axios.post(
    "https://closer-server.herokuapp.com/task",
    task
  );

  return response.data;
});
/*upload file add */
export const addUploadFile = createAsyncThunk(
  "Task/addUploadFile",
  async (files) => {
    var formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("listQuestion", files[key]);
    }

    const response = await axios.post(
      "https://closer-server.herokuapp.com/task/uploadFile",
      formData
    );
    console.log(response.data);

    return response.data;
  }
);
/*upload file */
export const uploadFile = createAsyncThunk("Task/uploadFile", async (files) => {
  const promise = await axios
    .post("https://closer-server.herokuapp.com/task/uploadFile", files)
    .then((response) => {
      console.log("this is response");
      console.log(response);
      console.log("this is data");
      console.log(response.data);
      //console.log(response);
      const data = response.data;

      // assign data
      return data;
    });

  const data = await promise;

  return data;
});

export const assignAfterSave = createAsyncThunk(
  "Task/assignAfterSave",
  async (task) => {
    const { response } = await axios.post(
      `https://closer-server.herokuapp.com/task/assignAfterSave/`,
      task
    );

    return response;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "Task/updateTaskStatus",
  async (task) => {
    const { response } = await axios.put(
      `https://closer-server.herokuapp.com/task/taskStatus/${task._id}`,
      task
    );

    return response;
  }
);
export const updateTask = createAsyncThunk("Task/UpdateTask", async (task) => {
  // console.log(task)
  const { response } = await axios.put(
    `https://closer-server.herokuapp.com/task/${task._id}`,
    task
  );

  return response;
});

export const DeleteResources = createAsyncThunk(
  "Task/DeleteResources",

  async (index) => {
    return index;
  }
);

export const UpdateResources = createAsyncThunk(
  "Task/UpdateResources",

  async (resources) => {
    //CoursesSlice.state.Resources.push(resources);
    console.log(resources);
    return resources;
  }
);

export const taskSlice = createSlice({
  name: "Task",
  initialState: {
    tasks: [],
    nbrRemis: 0,
    nbrMissing: 0,
    files: [],
    filesL: [],

    status: null,
    statusUpload: null,
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
      state.status = "success";
    },
    [UpdateResources.fulfilled]: (state, action) => {
      state.files.push(action.payload);
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getTaskByTeacher.pending]: (state, action) => {
      state.status = "loading";
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.statusUpload = "yakhdem";
      state.files.push(action.payload);
    },
    [addUploadFile.fulfilled]: (state, action) => {
      state.filesL.push(action.payload);
    },
    [DeleteResources.fulfilled]: (state, action) => {
      let res = action.payload;
      let resources = state.files.slice();
      resources = resources.filter((u) => {
        return u[0] !== res;
      });
      state.files = resources;
    },
    [getTaskByTeacher.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
      state.status = "success";
    },
    [getTaskByTeacher.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getDetailTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDetailTask.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
      state.status = "success";
    },
    [getDetailTask.rejected]: (state, action) => {
      state.status = "failed";
    },

    postTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    assignTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    [updateTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
    },
    [updateTask.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateTaskStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateTaskStatus.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
    },
    [updateTaskStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getNbrTasksRemis.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNbrTasksRemis.fulfilled]: (state, action) => {
      if (action.payload.length > 0) state.nbrRemis = action.payload[0].count;
    },
    [getNbrTasksRemis.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getNbrTasksMissing.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNbrTasksMissing.fulfilled]: (state, action) => {
      if (action.payload.length > 0) state.nbrMissing = action.payload[0].count;
    },
    [getNbrTasksMissing.rejected]: (state, action) => {
      state.status = "failed";
    },
    [assignAfterSave.pending]: (state, action) => {
      state.status = "loading";
    },
    [assignAfterSave.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
    [assignAfterSave.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default taskSlice.reducer;
