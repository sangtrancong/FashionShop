import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ShopService from '../services/ShopService';

export const fetchAllData = createAsyncThunk(
    'shops/FETCH_ALL_DATA',
    async (params, { rejectWithValue }) => {
        const response = await ShopService.search(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchById = createAsyncThunk(
    'shops/FETCH_BY_ID',
    async (id, { rejectWithValue }) => {
        const response = await ShopService.findById(id);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchByOrder = createAsyncThunk(
    'shops/FETCH_BY_ORDER',
    async ({userid, productid}, { rejectWithValue }) => {
        const response = await ShopService.findByOrder(userid, productid);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchByName = createAsyncThunk(
    'shops/FETCH_BY_NAME',
    async (keyword, { rejectWithValue }) => {
        const response = await ShopService.findByName(keyword);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const shopSlice = createSlice({
    name: "shops",
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

        [fetchById.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchById.fulfilled]: (state, action) => {
            const { status, data, metadata, totalRecords } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                ...state.selectedItem,
                data,
                metadata,
            };
        },
        [fetchById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },

        [fetchByOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchByOrder.fulfilled]: (state, action) => {
            const { metadata } = action.payload;
            state.isLoading = false;
            state.selectedItem = {
                ...state.selectedItem,
                metadata,
            };
        },
        [fetchByOrder.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },

        [fetchByName.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchByName.fulfilled]: (state, action) => {
            const { data = [], metadata = {} } = action.payload;
            state.isLoading = false;
            state.allData = data;
            state.metadata = metadata;
        },
        [fetchByName.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },
    }
});

export default shopSlice.reducer;
