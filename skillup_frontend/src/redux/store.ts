import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSlice } from "../redux/reducer/userReducer";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";

export const server = import.meta.env.BACKEND_SERVER || 'http://localhost:4000';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    // middleware: (mid: any) => [...mid(), userApi?.middleware] as any
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(userApi.middleware, productApi.middleware) as any

});

