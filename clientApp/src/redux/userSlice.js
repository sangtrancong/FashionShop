import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import UserService from '../services/UserService';
import ProfileService from '../services/ProfileService';

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

export const register = createAsyncThunk(
    'user/USER_REGISTER',
    async ({ fullname, email, password }, { rejectWithValue }) => {
        const response = await UserService.register(fullname, email, password);
        
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

export const findByUser = createAsyncThunk(
    'user/USER_PROFILE',
    async (id, { rejectWithValue }) => {
        const response = await ProfileService.findByUser(id);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const updateProfile = createAsyncThunk(
    'user/UPDATE_PROFILE',
    async (params, { rejectWithValue }) => {
        const response = await UserService.updateProfile(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const changePass = createAsyncThunk(
    'user/CHANGE_PASS',
    async (params, { rejectWithValue }) => {
        const response = await UserService.changepass(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const google = createAsyncThunk(
    'user/GOOGLE_REGISTER',
    async ({ fullname, email }, { rejectWithValue }) => {
        const response = await UserService.google(fullname, email);

        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem("userLogin", JSON.stringify(data?.data));
        }

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);

export const forgotpass = createAsyncThunk(
    'user/FORGOT_PASS',
    async (params, { rejectWithValue }) => {
        const response = await UserService.forgotpass(params);

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }

        return response.data;
    }
);


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isLogin: false,
        isSuccess: false,
        isChangePass: false,
        isForgotPass: false,
        profile: {},
        user: {},
        selectedItem: {},
        error: ''
    },
    reducers: {
        cleanUp: (state, action)=>{
            state.isLoading = false;
            state.isLogin = false;
            state.isSuccess = false;
            state.selectedItem = {};
            state.error = '';
        },

        logout: (state, action)=>{
            state.isLoading = false;
            state.isLogin = false;
            state.isSuccess = false;
            state.selectedItem = {};
            state.profile = {};
            state.user = {};
            state.error = '';
        },
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
            state.error = '';
            state.profile = {
                ...data,
            };
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.error = action.error
        },

        [register.pending]: (state, action) => {
            state.isLoading = true;
            state.isLogin = false;
            state.isSuccess = false;
            state.error = '';
        },
        [register.fulfilled]: (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isLogin = false;
            state.isSuccess = true;
            state.error = '';
            state.selectedItem = {
                ...data,
            };
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.isSuccess = false;
            state.error = action.error
        },

        [findByUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [findByUser.fulfilled]: (state, action) => {
            const { data = {} } = action.payload;
            state.isLoading = false;
            state.error = '';
            state.user = {
                ...data,
            };
        },
        [findByUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error
        },

        [updateProfile.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = '';
        },
        [updateProfile.fulfilled]: (state, action) => {
            const { data = {}, status } = action.payload;
            state.isLoading = false;
            state.error = '';
            state.isSuccess = status === 'SUCCESS';
        },
        [updateProfile.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error
        },

        [changePass.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isChangePass = false;
            state.error = '';
        },
        [changePass.fulfilled]: (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.error = '';
            state.isChangePass = data?.status === 'SUCCESS';
            state.selectedItem = {
                ...data,
            };
        },
        [changePass.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isChangePass = false;
            state.error = action.error
        },

        [google.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = '';
        },
        [google.fulfilled]: (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.error = '';
            state.isLogin = true;
            state.isSuccess = data?.status === 'SUCCESS';
            state.profile = {
                ...data,
            };
        },
        [google.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error
        },

        [forgotpass.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isForgotPass = false;
            state.error = '';
        },
        [forgotpass.fulfilled]: (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.error = '';
            state.isForgotPass = data?.status === 'SUCCESS';
            state.selectedItem = {
                ...data,
            };
        },
        [forgotpass.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isForgotPass = false;
            state.error = action.error
        },
    }
});

export const { cleanUp, logout } = userSlice.actions;

export default userSlice.reducer;
