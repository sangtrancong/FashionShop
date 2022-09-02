import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import OrderService from '../services/OrderService';

export const fetchByUser = createAsyncThunk(
    'order/FETCH_BY_USER',
    async (id, { rejectWithValue }) => {
        const response = await OrderService.findByUser(id);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const updatePayment = createAsyncThunk(
    'order/UPDATE_PAMENT',
    async (id, { rejectWithValue }) => {
        const response = await OrderService.updatePayment(id);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: {},
        selectedItem: {},
        payment: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [fetchByUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchByUser.fulfilled]: (state, action) => {
            const { data = [], metadata = {} } = action.payload;
            state.isLoading = false;
            state.allData = data;
        },
        [fetchByUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },

        [updatePayment.pending]: (state, action) => {
            state.isLoading = true;
            state.payment = false;
            state.error = '';
        },
        [updatePayment.fulfilled]: (state, action) => {
            const { status = 'ERROR', data = [], metadata = {} } = action.payload;
            state.isLoading = false;
            state.payment = status === 'SUCCESS' ? true : false;
        },
        [updatePayment.rejected]: (state, action) => {
            state.isLoading = false;
            state.payment = false;
            state.error = action.error
        },
    }
});

export default orderSlice.reducer;
