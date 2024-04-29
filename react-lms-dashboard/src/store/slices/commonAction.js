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
    dashboardleadTypeId: '',
    selectedBDEData: '',
    selectedClusterLeadData: '',
    startMonthDate: '',
    endMonthDate: ''
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

        LeadStatusRedirectionClose(state) {
            state.dashboardleadType = '';
            state.dashboardleadTypeId = '';
        },

        SelectedBdeDataFilter(state, action) {
            state.selectedBDEData = action.payload?.bdId;
        },

        SelectedUserDataFilter(state, action) {
            state.selectedBDEData = action.payload?.bdId;
            state.selectedClusterLeadData = action.payload?.clId;
        },

        DateRangeFilterSetup(state, action) {
            state.startMonthDate = action.payload?.start;
            state.endMonthDate = action.payload?.end;
        },

        ClearDateRangeFilterSetup(state) {
            state.dashboardleadType = '';
            state.dashboardleadTypeId = '';
            state.selectedBDEData = '';
            state.selectedClusterLeadData = '';
            state.startMonthDate = '';
            state.endMonthDate = '';
        }
    }
});

export const {
    SelectedUserDataFilter,
    SelectedBdeDataFilter,
    LeadStatusRedirection,
    LeadStatusRedirectionClose,
    DateRangeFilterSetup,
    ClearDateRangeFilterSetup
} = slice.actions;
// Reducer
export default slice.reducer;
