import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export const getList = async () => {
  const { data } = await instance.get("/");
  return data;
};

export const addSeance = async (seance) => {
  const { data } = await instance.post("/", { seance });
  return data;
};

export const updateSeance = async (seance, seanceId) => {
  const { data } = await await axios;
  axios.put(`/seance/${seanceId}`, seance).then((response) => {
    console.log(response);
    return response;
  });

  const promise = await data;
  return promise;
};
