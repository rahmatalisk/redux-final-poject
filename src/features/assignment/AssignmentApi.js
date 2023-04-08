import { apiSlice } from "../api/ApiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["assignments"],
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assignments"],
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["assignments"],
    }),
  }),
});

export const { useGetAssignmentsQuery,useAddAssignmentMutation,useDeleteAssignmentMutation,useEditAssignmentMutation } = assignmentApi;
