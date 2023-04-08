import { apiSlice } from "../api/ApiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags:["assignment"]
    }),
  }),
});


export const {useGetAssignmentQuery}= assignmentApi;
