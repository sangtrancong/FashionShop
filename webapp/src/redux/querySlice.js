import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: "query",
    initialState: {
        keyword: '',
        brandIds: [],
        categoryIds: [],
        attributeIds: [],
    },
    reducers: {
        setQuery: (state, action) => {
            const {
                brandIds = [],
                categoryIds = [],
                attributeIds = [], 
            } = action.payload;

            console.log('action.payload', action.payload)

            state.brandIds = brandIds;
            state.categoryIds = categoryIds;
            state.attributeIds = attributeIds;
        },
    },
    extraReducers: {

    }
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;
