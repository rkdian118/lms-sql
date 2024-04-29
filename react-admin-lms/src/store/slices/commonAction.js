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

// const PROXY = `${process.env.REACT_APP_API_URL}api/manager/`;

const initialState = {
    dashboardleadType: '',
    dashboardleadTypeId: ''
};

const slice = createSlice({
    name: 'Common-Action',
    initialState,
    reducers: {
        // Admin Login successfull
        LeadStatusRedirection(state, action) {
            // console.log('🚀  state:', action);
            state.dashboardleadType = action.payload?.leadtype;
            state.dashboardleadTypeId = action.payload?.leadStatusId;
        },

        LeadStatusRedirectionClose(state, action) {
            state.dashboardleadType = '';
            state.dashboardleadTypeId = '';
        }
    }
});

export const { LeadStatusRedirection, LeadStatusRedirectionClose } = slice.actions;
// Reducer
export default slice.reducer;
