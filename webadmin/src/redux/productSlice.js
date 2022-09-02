import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ProductService from '../services/ProductService';

export const fetchAllData = createAsyncThunk(
    'product/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await ProductService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchFormById = createAsyncThunk(
    'product/FETCH_BY_FORM',
    async (id, { rejectWithValue }) => {
        const response = await ProductService.findFormById(id);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const saveSingle = createAsyncThunk(
    'product/SAVE_DATA_SINGLE',
    async (params, { rejectWithValue }) => {
        const response = await ProductService.save(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const productSlice = createSlice({
    name: "products",
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
            state.error = 'ERROR';
        },

        [fetchFormById.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchFormById.fulfilled]: (state, action) => {
            const { status, data, metadata } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                data,
                metadata
            };
        },
        [fetchFormById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },

        [saveSingle.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [saveSingle.fulfilled]: (state, action) => {
            const { status, data, messages } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                status,
                data,
                messages,
            };
            state.error = status;
        },
        [saveSingle.rejected]: (state, action) => {
            state.isLoading = false;
            state.selectedItem = {};
            state.error = 'ERROR';
        }
    }
});

export const { clearSelectedItem } = productSlice.actions;

export default productSlice.reducer;
