import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    contacts: builder.query<any[], void>({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
    addContact: builder.mutation<void, any>({
      query: (contact) => ({
        url: "/posts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Posts"],
    }),
    updateContact: builder.mutation<void, any>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Posts"],
    }),
    deleteContact: builder.mutation<void, any>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
