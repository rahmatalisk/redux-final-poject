import { apiSlice } from "../api/ApiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMark: builder.query({
      query: () => "/assignmentMark",
      providesTags: ["assignmentMark"],
    }),
    postAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assignmentMark", "assignment", "assignments"],
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["assignmentMark"],
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assignmentMark"],
    }),
  }),
});

export const {
  useGetAssignmentMarkQuery,
  usePostAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation
} = assignmentMarkApi;
