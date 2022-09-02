import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import CategoryService from '../services/CategoryService';

export const fetchAllData = createAsyncThunk(
    'categorys/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await CategoryService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchById = createAsyncThunk(
    'categorys/FETCH_BY_ID',
    async (id, { rejectWithValue }) => {
        const response = await CategoryService.findyId(id);
        
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const saveSingle = createAsyncThunk(
    'categorys/SAVE_DATA_SINGLE',
    async (params, { rejectWithValue }) => {
        const response = await CategoryService.save(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const categorySlice = createSlice({
    name: "categorys",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: [],
        selectedItem: {},
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
            state.error = '';
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

export const { clearSelectedItem } = categorySlice.actions;

export default categorySlice.reducer;
