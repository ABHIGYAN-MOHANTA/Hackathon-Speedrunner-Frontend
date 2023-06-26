import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { v4 as uuidv4 } from "uuid";

const devpostAdapter = createEntityAdapter({
  selectId: () => uuidv4(),
});

const initialState = devpostAdapter.getInitialState();

export const devpostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDevpost: builder.query({
      query: () => "/devpost",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedEvents = responseData.map((event) => {
          event.name = event.title;
          return event;
        });
        return devpostAdapter.setAll(initialState, loadedEvents);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Event", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Event", id })),
          ];
        } else return [{ type: "Event", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetDevpostQuery } = devpostApiSlice;

// returns the query result object
export const selectDevpostResult =
  devpostApiSlice.endpoints.getDevpost.select();

// creates memoized selector
const selectDevpostData = createSelector(
  selectDevpostResult,
  (devpostResult) => devpostResult.data // normalized state object with eventname & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDevpost,
  // Pass in a selector that returns the devpost slice of state
} = devpostAdapter.getSelectors(
  (state) => selectDevpostData(state) ?? initialState
);
