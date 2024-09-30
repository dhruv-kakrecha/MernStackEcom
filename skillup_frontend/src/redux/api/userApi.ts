import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageType } from "../../types/api-types";
import { USer } from "../../types/types";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../lib";




export const userApi = createApi({
    //   any name show path 
    reducerPath: "userApi",
    // this are server link attach in base Url // server
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/user/` }),
    //  this add a  last endpoint url attatch
    endpoints: (builder) => ({
        login: builder.mutation<MessageType, USer>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user
            }),
        }),

        // Example for function endpoint 
        // lol:builder.query({
        //     query:()=>({
        //         url:"new2" 
        //     }),
        //     })
    })
});



export const getUser = async (id: any) => {

    console.log("checked id", id)
    try {
        const { data } = await axios.post(`${server}/user/${id}`);
        console.log("user checked__", data)
        if (data?.status) {
            return data;
        } else {
            toast.error(data?.message || "USer Not GEt Value");
        }
    } catch (error: any) {
        toast.error(error?.message)
    }
};

export const { useLoginMutation }: any = userApi;