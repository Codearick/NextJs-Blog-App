import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from './slices/postSlice'

const store = configureStore({
    reducer: {
        auth : authReducer
    }
});

export default store;