import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POSt",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi