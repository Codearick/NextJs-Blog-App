import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postReducer from './slices/postSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO : add more slices here for posts
    }
});

export default store;