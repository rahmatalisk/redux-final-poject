import { apiSlice } from "../api/ApiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags:["videos"]
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["video","videos"]
    }),
  }),
});

export const { useGetVideosQuery, useAddVideoMutation } = videosApi;
