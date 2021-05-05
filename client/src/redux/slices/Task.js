import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNbrTasksAttribue = createAsyncThunk(
  "Task/getNbrTasksAttribue",
  async (taskDetail) => {
    const { data } = await axios.get(
     
      `https://closer-server.herokuapp.com/task/StatTaskAttribue?idUser=${taskDetail.idUser}&idClass=${taskDetail.idClass}`,
    );

    return data;
  }
);

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
  async (taskDetail) => {
    console.log(taskDetail);
    const { data } = await axios.get(
      `https://closer-server.herokuapp.com/task/teacher?idUser=${taskDetail.idUser}&idClass=${taskDetail.idClass}`,
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
      formData.append("multiple_resources", files[key]);
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
    console.log(task);
    const promise = await axios.post(
      `https://closer-server.herokuapp.com/task/assignAfterSave/`,
      task
    ).then((response) => {
      const data = response.data;
      return data;
    });
  
  const data = await promise;
  return data;
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
  const promise = await axios.put(
    `https://closer-server.herokuapp.com/task/${task._id}`,
    task
  ).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });

const data = await promise;
return data;

 
});
export const deleteTask = createAsyncThunk("Task/deleteTask", async (id) => {
 
  
  const  promise  = await axios.delete(
    `https://closer-server.herokuapp.com/task/deleteTask/${id}`
    
  ).then((response) => {
    const data = response.data;
    return data;
  });

const data = await promise;
return data;


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
    tasksAttribue: [],
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
      console.log(action.payload);
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
    [getTaskByTeacher.fulfilled]: (state, action) => {
      state.tasks = action.payload;
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
    [deleteTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteTask.fulfilled]: (state, action ) => {
      state.tasks = state.tasks.filter((u) => {
        return u._id !== action.payload._id;
      });
      
      state.status = "success";
     
    },
    [deleteTask.rejected]: (state, action) => {
      state.status = "failed";
    },
   
    assignTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    [updateTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateTask.fulfilled]: (state, action ) => {
     const index = state.tasks.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.status = "success";
      }

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
      
      if(action.payload.length)
        state.nbrRemis = action.payload[0].count;
      
      console.log(state.nbrRemis);
    },
    [getNbrTasksRemis.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getNbrTasksMissing.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNbrTasksMissing.fulfilled]: (state, action) => {
      if (action.payload.length > 0) 
      state.nbrMissing = action.payload[0].count;
    },
    [getNbrTasksMissing.rejected]: (state, action) => {
      state.status = "failed";
    },
    [assignAfterSave.pending]: (state, action) => {
      state.status = "loading";
    },
    [assignAfterSave.fulfilled]: (state, action) => {
      const payload = action.payload;
      const index = state.tasks.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.tasks[index] = payload;
        state.status = "success";
      }
    },
    [assignAfterSave.rejected]: (state, action) => {
      state.status = "failed";
    },


    [getNbrTasksAttribue.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNbrTasksAttribue.fulfilled]: (state, action) => {
      
      state.tasksAttribue = action.payload;
    },
    [getNbrTasksAttribue.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default taskSlice.reducer;
