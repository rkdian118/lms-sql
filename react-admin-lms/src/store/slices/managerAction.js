// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const PROXY = `${process.env.REACT_APP_API_URL}api/manager/`;

const initialState = {
    bdTargetList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    bdTargetLoading: true,
    getBdeList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getBdeLoading: true
};

const slice = createSlice({
    name: 'Manager-Action',
    initialState,
    reducers: {
        // Admin Login successfull
        Bd_Target_Get_List_Success(state, action) {
            state.bdTargetList = action.payload?.ResponseData;
            state.bdTargetLoading = false;
        },

        Get_Bde_List_Success(state, action) {
            state.getBdeList = action.payload?.ResponseData;
            state.getBdeLoading = false;
        }
    }
});

// export const {} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Branch Crud */
export const GetAllBdeListApi =
    (page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-bds-list?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Get_Bde_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const BdTargetGetListApi =
    (page = '', limit = '', targetMonth = '', targetYear = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-bds-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            );
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Bd_Target_Get_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateBdTargetsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateCompleteTargetsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}complete-bd-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}complete-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
