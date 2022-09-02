import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import UserService from '../services/UserService';

export const login = createAsyncThunk(
    'user/USER_LOGIN',
    async ({ username, password }, { rejectWithValue }) => {
        const response = await UserService.login(username, password);
        
        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem("userLogin", JSON.stringify(data));
        }

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const logout = createAsyncThunk(
    'user/USER_LOGOUT',
    async (id, { rejectWithValue }) => {
        localStorage.removeItem("userLogin");
        // const response = await CategoryService.findyId(id);
        
        // if (response.status < 200 || response.status >= 300) {
        //     return rejectWithValue(response);
        // }

        // return response.data;
        return null;
    }
);

export const loginSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isLogin: false,
        profile: {},
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoading = true;
            state.isLogin = false;
            state.error = '';
        },
        [login.fulfilled]: (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isLogin = true;
            state.profile = {
                ...data,
            };
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.error = action.error
        },

        [logout.pending]: (state, action) => {
            state.isLoading = true;
            state.isLogin = false;
            state.error = '';
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.profile = {};
        },
        [logout.rejected]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.error = 'ERROR';
        },

    }
});

export default loginSlice.reducer;
