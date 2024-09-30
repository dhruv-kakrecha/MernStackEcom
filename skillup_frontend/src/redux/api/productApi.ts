import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../lib";





export const productApi = createApi({


    reducerPath: 'productApi',


    baseQuery: fetchBaseQuery({ baseUrl: `${server}/product/` }),


    endpoints: (builder) => ({
        getProducts: builder.query<any, any>({
            query: () => ({
                url: "latest",
                method: "GET",
            })
        }),
        getAdminProducts: builder.query<any, void>({
            query: (id) => ({
                url: `admin-products?id=${id}`,
                method: "GET"
            })
        }),
        getSingleProduct: builder.query<any, any>({
            query: (productId) => ({
                url: productId,
                path: "GET"
            })
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `${product?.id}?id=${product?.userId}`,
                method: "PUT",
                body: product?.formData,

            })
        }),
        deleteProduct: builder.mutation({
            query: (state) => ({
                url: `${state?.id}?=${state?.userId}`,
                method: "DELETE",
            })
        }),
        createProduct: builder.mutation({
            query: (state) => ({
                url: `newproduct?id=${state?.userId}`,
                method: "POST",
                body: state?.formData
            })
        })

    })
});

export const {
    useGetProductsQuery,
    useGetAdminProductsQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation,
    userDeleteProductMuation,
    useCreateProductMutation
}: any = productApi;


