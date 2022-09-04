import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import OrderService from '../services/OrderService';

export const fetchAllData = createAsyncThunk(
    'orders/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await OrderService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchByProgress = createAsyncThunk(
    'orders/FETCH_BY_PROGRESS',
    async (progress, { rejectWithValue }) => {
        const response = await OrderService.findByProgress(progress);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);


export const fetchById = createAsyncThunk(
    'orders/FETCH_BY_ID',
    async (id, { rejectWithValue }) => {
        const response = await OrderService.findyId(id);
        
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const findByOrders = createAsyncThunk(
    'orders/FETCH_BY_ORDER',
    async (id, { rejectWithValue }) => {
        const response = await OrderService.findByOrder(id);
        
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const saveSingle = createAsyncThunk(
    'orders/SAVE_DATA_SINGLE',
    async (params, { rejectWithValue }) => {
        const response = await OrderService.save(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const fetchByDelivery = createAsyncThunk(
    'orders/FETCH_BY_DELIVERY',
    async (id, { rejectWithValue }) => {
        const response = await OrderService.findByDelivery(id);
        
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);


export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: [],
        selectedItem: {},
        orderDetails: [],
        deliverys: [],
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

        [fetchByProgress.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchByProgress.fulfilled]: (state, action) => {
            const data = action.payload.data;
            state.isLoading = false;
            state.allData = data;
        },
        [fetchByProgress.rejected]: (state, action) => {
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

        //findByOrders
        [findByOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [findByOrders.fulfilled]: (state, action) => {
            const { data, metadata } = action.payload;
            state.isLoading = false;
            state.orderDetails = data;
            state.metadata = metadata;
        },
        [findByOrders.rejected]: (state, action) => {
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
        },

        //fetchByDelivery
        [fetchByDelivery.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchByDelivery.fulfilled]: (state, action) => {
            const { status, data, metadata } = action.payload;
            state.isLoading = false;
            state.deliverys = data;
            state.metadata = metadata;
            state.error = status;
        },
        
        [fetchByDelivery.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'ERROR';
        },
    }
});

export const { clearSelectedItem } = orderSlice.actions;

export default orderSlice.reducer;
