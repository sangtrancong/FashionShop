import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import HomeService from '../services/HomeService';

export const fetchAllData = createAsyncThunk(
    'homes/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await HomeService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const homeSlice = createSlice({
    name: "homes",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: {},
        selectedItem: {},
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [fetchAllData.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchAllData.fulfilled]: (state, action) => {
            const { data = [], metadata = {} } = action.payload;
            state.isLoading = false;
            state.allData = data;
            state.metadata = metadata;
        },
        [fetchAllData.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },

    }
});

export default homeSlice.reducer;
