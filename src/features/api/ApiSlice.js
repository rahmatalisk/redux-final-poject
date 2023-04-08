import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lws-server-p8t7.onrender.com",
    tagTypes: ["video", "assignmentMark", "assignment", "assignments","videos"],
  }),

  endpoints: (builder) => ({}),
});
