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

const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;
const NEWPROXY = `${process.env.REACT_APP_API_URL}api/bd/`;

const initialState = {
    branchList: {
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
    branchLoading: true,
    clusterList: {
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
    clusterLoading: true,
    adminList: {
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
    adminLoading: true,
    branchTargetList: {
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
    branchTargetLoading: true,
    activeBranchList: [],
    clusterDetails: {}
};

const slice = createSlice({
    name: 'Admin-Action',
    initialState,
    reducers: {
        // Admin Login successfull
        Admin_Get_List_Success(state, action) {
            state.adminList = action.payload?.ResponseData;
            state.adminLoading = false;
        },
        Branch_Get_Success(state, action) {
            state.branchList = action.payload?.ResponseData;
            state.branchLoading = false;
        },

        Branch_Target_Get_Success(state, action) {
            state.branchTargetList = action.payload?.ResponseData;
            state.branchTargetLoading = false;
        },

        Cluster_Get_Success(state, action) {
            state.clusterList = action.payload?.ResponseData;
            state.clusterLoading = false;
        },

        Active_Branch_List_Success(state, action) {
            state.activeBranchList = action.payload?.ResponseData;
        }
    }
});

// export const {} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Month Target Start Api for All Roles */
export const MonthlyTargetStart = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}start-month`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

/* Branch Crud */
export const AllAdminGetListApi =
    (page = '', limit = '') =>
    async () => {
        try {
            const response = await axios.get(`${PROXY}get-admins?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Admin_Get_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddAdminApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}create-admin`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BranchGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            const response = await axios.get(`${PROXY}get-branches?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Branch_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddBranchApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}create-branch`, data, config);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateBranchApi = (data) => async () => {
    try {
        const response = await axios.put(`${PROXY}update-branch-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ActiveBranchApi = () => async () => {
    try {
        const response = await axios.get(`${PROXY}get-dropdown-branches`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Active_Branch_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BranchGetDetailsApi = (id) => async () => {
    try {
        const response = await axios.get(`${PROXY}get-branch-detail?branch_id=${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

/* Branch Targets */
export const BranchTargetGetApi =
    (page = '', limit = '', targetMonth = '', targetYear = '') =>
    async () => {
        try {
            const response = await axios.get(
                `${PROXY}get-branch-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Branch_Target_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateBranchTargetApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-branch-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* Cluster Crud */
export const ClusterGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            const response = await axios.get(`${PROXY}get-cluster_heads?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Cluster_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddClusterApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}create-cluster-head`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateClusterApi = (data) => async () => {
    try {
        const response = await axios.put(`${PROXY}update-cluster-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterStatusChangeApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}cluster-status-change`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterGetDetailsApi = (id) => async () => {
    try {
        const response = await axios.get(`${PROXY}get-cluster-detail?_id=${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const SwitchClusterBranchApi = (data) => async () => {
    try {
        const response = await axios.put(`${PROXY}update-cluster-branch`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
