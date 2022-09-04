import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import DashboardService from '../services/DashboardService';

export const fetchAllData = createAsyncThunk(
    'dashboards/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await DashboardService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const report = createAsyncThunk(
    'dashboards/REPORT_BY_DATE',
    async (params, { rejectWithValue }) => {
        const response = await DashboardService.report(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const dashboardSlice = createSlice({
    name: "dashboards",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: [],
        selectedItem: {},
        totalCost: 0,
        totalOrder: 0,
        totalProduct: 0,
        totalUser: 0,
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
            const { data, metadata } = action.payload;
            state.isLoading = false;
            state.allData = data;
            state.metadata = metadata;
        },
        [fetchAllData.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },

        [report.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [report.fulfilled]: (state, action) => {
            const { data, metadata } = action.payload;
            state.isLoading = false;
            state.allData = data?.orderDTOList;
            state.totalCost = data?.totalCost;
            state.totalOrder = data?.totalOrder;
            state.totalProduct = data?.totalProduct;
            state.totalUser = data?.totalUser;
        },
        [report.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },
    }
});

export default dashboardSlice.reducer;
