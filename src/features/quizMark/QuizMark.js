import { apiSlice } from "../api/ApiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: () => "/quizMark",
      providesTags:["quizMark"]
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
       invalidatesTags: ["assignmentMark","quizMark"],
    }),
  }),
});

export const { useGetQuizMarkQuery ,useAddQuizMarkMutation} = quizMarkApi;
