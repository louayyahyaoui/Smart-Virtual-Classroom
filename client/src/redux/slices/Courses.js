import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RetrieveCourses = createAsyncThunk(
  "Courses/RetrieveCourses",
  async () => {
    const { data } = await axios.get(
      "https://closer-server.herokuapp.com/courses"
    );

    return data;
  }
);

export const RetrieveCoursesByIdSeance = createAsyncThunk(
  "Courses/RetrieveCoursesByIdSeance",
  async (idSeance) => {
    const { data } = await axios.get(
      "https://closer-server.herokuapp.com/courses/findByIdSeance/" + idSeance
    );

    return data;
  }
);

export const RetrieveCoursesByIdClass = createAsyncThunk(
  "Courses/RetrieveCoursesByIdClass",
  async (idClass) => {
    const { data } = await axios.get(
      "https://closer-server.herokuapp.com/courses/findByIdClass/" + idClass
    );

    return data;
  }
);

export const AddCourses = (
  idSeance,
  titre,
  description,
  multiple_resources,
  idOwner,
  idClass
) => async (dispatch) => {
  console.log(multiple_resources);
  var formData = new FormData();
  for (const key of Object.keys(multiple_resources)) {
    formData.append("multiple_resources", multiple_resources[key]);
  }
  formData.append("titre", titre);

  formData.append("description", description);
  if (idSeance !== "") {
    formData.append("idSeance", idSeance);
  }

  formData.append("idOwner", idOwner);
  formData.append("idClass", idClass);

  const promise = await axios
    .post("https://closer-server.herokuapp.com/courses/", formData)
    .then((response) => {
      const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
      console.log(CurrentClass._id);
      dispatch(RetrieveCoursesByIdClass(CurrentClass._id));
      const data = response.data;

      // assign data
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  const data = promise;
  console.log("this is data");
  console.log(data);
  return data;
};

export const UpdateCourses = (
  coursesId,
  titre,
  description,
  Resources,
  selectedItem
) => async (dispatch) => {
  const cour = {
    titre: titre,
    description: description,
    multiple_resources: Resources,
    idSeance: selectedItem,
  };
  console.log("this is cour");
  console.log(cour);

  const promise = await axios
    .put("https://closer-server.herokuapp.com/courses/" + coursesId, cour)
    .then((response) => {
      const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
      console.log(CurrentClass._id);
      dispatch(RetrieveCoursesByIdClass(CurrentClass._id));

      const data = response.data;

      // assign data
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  const data = promise;
  console.log("this is data");
  console.log(data);
  return data;
};

export const GetCoursesById = createAsyncThunk(
  "Courses/GetCoursesById",

  async (coursesId) => {
    const promise = await axios
      .get("https://closer-server.herokuapp.com/courses/" + coursesId)

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
  }
);

export const UpdateResources = createAsyncThunk(
  "Courses/UpdateResources",

  async (resources) => {
    //CoursesSlice.state.Resources.push(resources);
    console.log(resources);
    return resources;
  }
);

export const DeleteCourses = createAsyncThunk(
  "Courses/DeleteCourses",

  async (coursesId) => {
    const promise = await axios
      .delete("https://closer-server.herokuapp.com/courses/" + coursesId)

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
  }
);

export const DeleteResources = createAsyncThunk(
  "Courses/DeleteResources",

  async (index) => {
    return index;
  }
);

export const CoursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: [],
    status: null,
    statusUpdate: null,
    coursesById: [],
    coursesBySeance: [],
    Resources: [],
  },
  extraReducers: {
    [RetrieveCourses.pending]: (state, action) => {
      state.status = "loading";
    },
    [RetrieveCourses.fulfilled]: (state, { payload }) => {
      state.courses = payload;
      state.status = "success";
    },
    [RetrieveCourses.rejected]: (state, action) => {
      state.status = "failed";
    },
    [RetrieveCoursesByIdSeance.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.coursesBySeance = payload;
    },
    [RetrieveCoursesByIdClass.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.courses = payload;
    },
    [UpdateResources.fulfilled]: (state, action) => {
      //state.Resources.push(action.payload);

      state.Resources.push(action.payload);
    },

    [GetCoursesById.fulfilled]: (state, action) => {
      state.coursesById = action.payload;
      state.Resources = action.payload.multiple_resources;
      console.log(state.Resources);
    },
    [DeleteCourses.fulfilled]: (state, action) => {
      state.courses = state.courses.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },

    [DeleteResources.fulfilled]: (state, action) => {
      //state.Resources.splice(action.payload, 1);
      let res = action.payload;
      let resources = state.Resources.slice();
      resources = resources.filter((u) => {
        return u.url !== res;
      });
      state.Resources = resources;
    },

    // [DeleteResources.fulfilled]: (state, action) => {
    //   let index = action.payload;

    //   //state.Resources.splice(index,1)
    // },
    // [UpdateCourses.fulfilled]: (state, action) => {
    //   state.statusUpdate = "success";
    //   let cour = action.payload.result;
    //   let courses = state.courses.slice();
    //   for (let i = 0, n = courses.length; i < n; i++) {
    //     if (courses[i]._id === cour._id) {
    //       //courses[i].idCour = cour.idCour;
    //       courses[i].titre = cour.titre;
    //       courses[i].idSeance = cour.idSeance;
    //       courses[i].dateCreation = cour.dateCreation;
    //       courses[i].description = cour.description;
    //       courses[i].multiple_resources = cour.multiple_resources;

    //       break; // Stop this loop, we found it!
    //     }
    //   }
    //   state.courses = courses;
    // },
    // [EditCourses.fulfilled]: (state, action) => {
    //   // let cour = action.payload;
    //   // for (let i = 0, n = state.courses.length; i < n; i++) {
    //   //   if (state.courses[i]._id === cour._id) {
    //   //     state.courses[i] = cour;
    //   //     break; // Stop this loop, we found it!
    //   //   }
    //   // }

    //   console.log("test");
    // }

    // // //   const index = state.courses.findIndex(
    // // //     (cour) => cour.id !== action.payload.result
    // // //   ); //finding index of the item
    // // //   const newArray = [...state.todos]; //making a new array
    // // //   newArray[index].completed = true; //changing value in the new array
    // // //   return {
    // // //     ...state, //copying the orignal state
    // // //     todos: newArray, //reassingning todos to new array
    // // //   };
    // // // },

    // AddCourses: (state, action) => {
    //   console.log("this is payload");
    //   console.log(action.payload);
    //   state.courses.push(action.payload.result);
    // },
    // GetCoursesById: (state, action) => {
    //   state.coursesById = action.payload;
    // },
    // DeleteCourses: (state, action) => {
    //   let cour = action.payload;
    //   let courses = state.courses.slice();
    //   courses = courses.filter((u) => {
    //     return u._id !== cour._id;
    //   });
    //   state.courses = courses;
    // },

    UpdateCourses: (state, action) => {
      state.statusUpdate = "success";
      let cour = action.payload.result;

      for (let i = 0, n = state.courses.length; i < n; i++) {
        if (state.courses[i]._id === cour._id) {
          state.courses[i].titre = cour.titre;
          state.courses[i].idSeance = cour.idSeance;
          state.courses[i].dateCreation = cour.dateCreation;
          state.courses[i].description = cour.description;
          state.courses[i].multiple_resources = cour.multiple_resources;

          break; // Stop this loop, we found it!
        }
      }
    },

    AddCourses: (state, action) => {
      state.courses.push(action.payload.result);
    },
  },
});

export default CoursesSlice.reducer;
