import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import RatingService from '../services/RatingService';

export const fetchAllData = createAsyncThunk(
    'ratings/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await RatingService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchById = createAsyncThunk(
    'ratings/FETCH_BY_ID',
    async (id, { rejectWithValue }) => {
        const response = await RatingService.findById(id);
        
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const saveSingle = createAsyncThunk(
    'ratings/SAVE_DATA_SINGLE',
    async (params, { rejectWithValue }) => {
        const response = await RatingService.save(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const ratingSlice = createSlice({
    name: "ratings",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: [],
        error: ''
    },
    reducers: {
        clearSelectedItem: (state, action)=>{
            state.selectedItem = {};
        },
    },
    extraReducers: {
        [fetchAllData.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchAllData.fulfilled]: (state, action) => {
            const data = action.payload.data;
            state.isLoading = false;
            state.allData = data;
        },
        [fetchAllData.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },

        //fetchById
        [fetchById.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchById.fulfilled]: (state, action) => {
            const { status, data, metadata } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                data,
                metadata
            };
        },
        [fetchById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },

        //saveSingle
        [saveSingle.pending]: (state, action) => {
            state.isLoading = true;
            state.error = ''
        },
        [saveSingle.fulfilled]: (state, action) => {
            const { status, data, messages, metadata } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                status,
                data,
                messages,
                metadata,
            };
            state.error = status;
        },
        [saveSingle.rejected]: (state, action) => {
            state.isLoading = false;
            state.selectedItem = {};
            state.error = 'ERROR'
        }

    }
});

export const { clearSelectedItem } = ratingSlice.actions;

export default ratingSlice.reducer;
