import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ShopService from '../services/ShopService';
import CheckoutService from '../services/CheckoutService';

export const fetchAllData = createAsyncThunk(
    'cart/FETCH_ALL_DATA',
    async (data, { rejectWithValue }) => {
        const response = await ShopService.findAll();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const saveItems = createAsyncThunk(
    'cart/SAVE_ITEM_DATA',
    async (params, { rejectWithValue }) => {
        const response = await CheckoutService.save(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        allData: [],
        messages: [],
        metadata: {},
        selectedItem: {},
        error: ''
    },
    reducers: {
        loadItem: (state, action)=>{
            const cartItems = localStorage.getItem('cartItems');
            state.isLoading = false;
            state.allData = JSON.parse(cartItems);
        },

        setItem: (state, action)=>{
            const product = action.payload;
            const cartIndex = state?.allData?.findIndex((item) => item?.product?.id === product?.id);

            if (cartIndex === -1) {
                const newItem = {
                    product: product,
                    attribute: product?.attribute || {},
                    quantity: product?.quantity || 1,
                }
                state.allData.push(newItem);
            } else {
                let newItem = state.allData[cartIndex];
                newItem = {
                    product: product,
                    attribute: product?.attribute || {},
                    quantity: product?.quantity || 1,
                }
                state.allData[cartIndex] = newItem;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.allData));
        },

        addItem: (state, action)=>{
            const product = action.payload;
            const cartIndex = state?.allData?.findIndex((item) => item?.product?.id === product?.id);

            if (cartIndex === -1) {
                const newItem = {
                    product: product,
                    quantity: 1,
                }
                state.allData.push(newItem);
            } else {
                let newItem = state.allData[cartIndex];
                newItem = {
                    product: product,
                    quantity: newItem.quantity + 1,
                }
                state.allData[cartIndex] = newItem;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.allData));
        },

        removeItem: (state, action)=>{
            const product = action.payload;
            const cartIndex = state?.allData?.findIndex((item) => item?.product?.id === product?.id);

            if (cartIndex !== -1) {
                let newItem = state.allData[cartIndex];
                if (newItem && newItem.quantity > 1) {
                    newItem = {
                        product: product,
                        quantity: newItem.quantity - 1,
                    }
                    state.allData[cartIndex] = newItem;
                } else {
                    state.allData = state.allData.filter((item) => item?.product?.id !== product?.id)
                }
                localStorage.setItem('cartItems', JSON.stringify(state.allData));
            }
        },

        deleteItem: (state, action)=>{
            const product = action.payload;
            state.allData = state.allData.filter((item) => item?.product?.id !== product?.id);
            localStorage.setItem('cartItems', JSON.stringify(state.allData));
        },
    },
    extraReducers: {
        [saveItems.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [saveItems.fulfilled]: (state, action) => {
            const { status = '' } = action.payload;
            state.isLoading = false;
            state.error = status;
        },
        [saveItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },

    }
});

export const { loadItem, addItem, setItem, removeItem, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
