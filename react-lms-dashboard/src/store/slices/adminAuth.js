// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { setAuthSession } from 'config';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const PROXY = `${process.env.REACT_APP_API_URL}api/user/`;

const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    adminRole: localStorage.getItem('adminRole'),
    isAuthenticated: false,
    loading: true,
    adminDetails: {},
    error: null
};

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Admin Login successfull
        Login_Success(state, action) {
            state.adminToken = action.payload?.ResponseData?.token;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = action.payload?.ResponseData?.role_type;
            state.adminDetails = {};
        },

        // Admin Login Failed
        Login_Failed(state) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
        },

        // Admin secret key verification
        Login_Verification_Success(state, action) {
            state.adminToken = action.payload?.ResponseData?.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.adminRole = action.payload?.ResponseData?.role_type;
            state.adminDetails = action.payload?.ResponseData?.user;
        },

        // Admin secret key verification failed
        Login_Verification_Failed(state, action) {
            state.adminToken = null;
            state.adminRole = '';
            state.isAuthenticated = false;
            state.loading = false;
            state.adminDetails = {};
        },

        // Admin details
        Admin_Details(state, action) {
            state.adminDetails = action.payload?.ResponseData?.user;
            state.isAuthenticated = true;
            state.loading = false;
        },

        // details failed
        Admin_Details_Failed(state, action) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        // logout
        LogoutSession(state) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        // All  Erros
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { LogoutSession } = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const AdminLoginApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}login`, data);
        const response = await axiosApiHelper('post', `${PROXY}login`, data);
        if (response?.data?.succeeded === true) {
            dispatch(slice.actions.Login_Success(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const VerificationSecretApi = (data, newToken) => async () => {
    const newAuth = {
        headers: {
            authorization: `bearer ${newToken}`
        }
    };
    try {
        const response = await axios.post(`${PROXY}verify-secret-key`, data, newAuth);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Login_Verification_Success(response.data));
            setAuthSession(response.data.ResponseData?.token);
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Login_Verification_Failed(error));
        return error;
    }
};

export const AdminDetailApi = (newToken, role) => async () => {
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${newToken}`
        }
    };
    const data = { role_type: role };
    try {
        const response = await axios.post(`${PROXY}profile`, data, newAuth);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Admin_Details(response.data));
        } else {
            dispatch(slice.actions.Admin_Details_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Admin_Details_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};

export const UpdateProfileApi = (formData) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-profile`, formData);
        const response = await axiosApiHelper('put', `${PROXY}update-profile`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ChangePasswordApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-profile`, formData);
        const response = await axiosApiHelper('put', `${PROXY}update-password`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
