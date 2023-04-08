import { apiSlice } from "../api/ApiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: ["video"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["videos", "video"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useDeleteVideoMutation,
  useEditVideoMutation,
} = videoApi;
