import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { v4 as uuidv4 } from "uuid";

const mlhAdapter = createEntityAdapter({
  selectId: () => uuidv4(),
});

const initialState = mlhAdapter.getInitialState();

export const mlhApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMlh: builder.query({
      query: () => "/mlh",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedEvents = responseData.map((event) => {
          event.name = event.eventname;
          return event;
        });
        return mlhAdapter.setAll(initialState, loadedEvents);
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

export const { useGetMlhQuery } = mlhApiSlice;

// returns the query result object
export const selectMlhResult = mlhApiSlice.endpoints.getMlh.select();

// creates memoized selector
const selectMlhData = createSelector(
  selectMlhResult,
  (mlhResult) => mlhResult.data // normalized state object with eventname & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllMlh,
  // Pass in a selector that returns the mlh slice of state
} = mlhAdapter.getSelectors((state) => selectMlhData(state) ?? initialState);
