import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getList, updateSeance, addSeance } from "../../api/SeanceApi";

export const RetrieveSeances = createAsyncThunk("/Seance", async () => {
  const { data } = await axios.get(
    "https://closer-server.herokuapp.com/seance"
  );

  return data;
});

export const AddSeance = createAsyncThunk(
  "Seance/AddSeance",
  async (seance) => {
    const promise = await axios
      .post("https://closer-server.herokuapp.com/seance/", seance)

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

export const GetSeancesById = createAsyncThunk(
  "Seance/GetSeancesById",
  async (seanceId) => {
    const promise = await axios
      .get("https://closer-server.herokuapp.com/seance/" + seanceId)

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

export const GetSeancesByIdClass = createAsyncThunk(
  "Seance/GetSeancesByIdClass",
  async (idClass) => {
    const promise = await axios
      .get(
        "https://closer-server.herokuapp.com/seance/findByIdClass/" + idClass
      )

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

export const EditSeances = createAsyncThunk(
  "Seance/EditSeances",
  async (seance) => {
    //console.log(seanceId);

    const promise = await axios
      .put("https://closer-server.herokuapp.com/seance/" + seance._id, seance)

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

export const DeleteSeance = createAsyncThunk(
  "Seance/DeleteSeance",

  async (seanceId) => {
    const promise = await axios
      .delete("https://closer-server.herokuapp.com/seance/" + seanceId)

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

export const SeanceSlice = createSlice({
  name: "Seance",
  initialState: {
    seance: [],
    status: null,
    statusUpdate: null,
    seanceById: null,
  },
  extraReducers: {
    [RetrieveSeances.pending]: (state, action) => {
      state.status = "loading";
    },
    [RetrieveSeances.fulfilled]: (state, { payload }) => {
      state.seance = payload;
      state.status = "success";
    },
    [RetrieveSeances.rejected]: (state, action) => {
      state.status = "failed";
    },
    [AddSeance.fulfilled]: (state, action) => {
      state.seance.push(action.payload.result);
    },
    [GetSeancesById.fulfilled]: (state, action) => {
      state.seanceById = action.payload;
    },
    [GetSeancesByIdClass.fulfilled]: (state, action) => {
      state.seance = action.payload;
    },
    [DeleteSeance.fulfilled]: (state, action) => {
      state.seance = state.seance.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [EditSeances.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      let seance = action.payload.result;
      let seances = state.seance.slice();
      for (let i = 0, n = seances.length; i < n; i++) {
        if (seances[i]._id === seance._id) {
          seances[i].idCour = seance.idCour;
          seances[i].titre = seance.titre;
          seances[i].description = seance.description;

          break; // Stop this loop, we found it!
        }
      }
      state.seance = seances;
    },

    // AddSeance: (state, action) => {
    //   state.seance.push(action.payload);
    // },
    // GetSeancesById: (state, action) => {
    //   state.seanceById = action.payload;
    // },
    // DeleteSeance: (state, action) => {
    //   let seance = action.payload;
    //   let seances = state.seance.slice();
    //   seances = seances.filter((u) => {
    //     return u._id !== seance._id;
    //   });
    //   state.seances = seances;
    // },
    // EditSeances: (state, action) => {
    //   let seance = action.payload;
    //   let seances = state.seance.slice();
    //   for (let i = 0, n = seances.length; i < n; i++) {
    //     if (seances[i]._id === seance._id) {
    //       seances[i].idCour = seance.idCour;
    //       seances[i].titre = seance.titre;
    //       seances[i].description = seance.description;

    //       break; // Stop this loop, we found it!
    //     }
    //   }
    //   state.seance = seances;
    // },
  },
});

export default SeanceSlice.reducer;
