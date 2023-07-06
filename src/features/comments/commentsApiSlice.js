import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "/comments",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedComments = responseData.map((comment) => {
          comment.id = comment._id;
          return comment;
        });
        return commentsAdapter.setAll(initialState, loadedComments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Comment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Comment", id })),
          ];
        } else return [{ type: "Comment", id: "LIST" }];
      },
    }),
    addNewComment: builder.mutation({
      query: (formData) => ({
        url: "/comments",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: (formData) => ({
        url: `/comments`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
} = commentsApiSlice;

// returns the query result object
export const selectCommentsResult =
  commentsApiSlice.endpoints.getComments.select();

// creates memoized selector
const selectCommentsData = createSelector(
  selectCommentsResult,
  (commentsResult) => commentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  // Pass in a selector that returns the comments slice of state
} = commentsAdapter.getSelectors(
  (state) => selectCommentsData(state) ?? initialState
);
