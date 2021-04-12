import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

export default configureStore({
  reducer,
});
