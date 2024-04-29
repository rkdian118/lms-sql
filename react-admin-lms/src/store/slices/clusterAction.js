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

const PROXY = `${process.env.REACT_APP_API_URL}api/cluster/`;

const initialState = {
    getBdeDropdownList: [],
    getBdeDropdownLoading: true,
    teamLeadList: {
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
    teamLeadLoading: true,
    clusterLeadList: {
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
    clusterLeadLoading: true,
    businessList: {
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
    businessLoading: true,
    targetList: {
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
    targetLoading: true,
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
    clusterDetails: {},
    getBranchLeadList: {
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
    getBranchLeadLoading: true,
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true,
    getLeadActivityData: [],
    getLeadActivityLoading: true
};

const slice = createSlice({
    name: 'Cluster-Action',
    initialState,
    reducers: {
        Team_Lead_Get_Success(state, action) {
            state.teamLeadList = action.payload?.ResponseData;
            state.teamLeadLoading = false;
        },

        Cluster_Lead_Get_Success(state, action) {
            state.clusterLeadList = action.payload?.ResponseData;
            state.clusterLeadLoading = false;
        },

        BD_Get_Success(state, action) {
            state.businessList = action.payload?.ResponseData;
            state.businessLoading = false;
        },

        Targets_Get_Success(state, action) {
            state.targetList = action.payload?.ResponseData;
            state.targetLoading = false;
        },
        BD_Targets_Get_Success(state, action) {
            state.bdTargetList = action.payload?.ResponseData;
            state.bdTargetLoading = false;
        },

        UserDeactivated(state, action) {
            state.teamLeadLoading = false;
            state.businessLoading = false;
            state.targetLoading = false;
            state.teamLeadList = initialState.teamLeadList;
            state.businessList = initialState.businessList;
            state.targetList = initialState.targetList;
        },

        Get_Bde_Dropdown_list_Data_Success(state, action) {
            state.getBdeDropdownList = action.payload?.ResponseData;
            state.getBdeDropdownLoading = false;
        },

        Branch_Lead_List_Success(state, action) {
            state.getBranchLeadList = action.payload?.ResponseData;
            state.getBranchLeadLoading = false;
        },

        Get_Follow_Ups_Details_Success(state, action) {
            state.getFollowUpsCallsDetails = action.payload?.ResponseData;
            state.getFollowUpsCallsDetailsLoading = false;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export const TeamLeadGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-managers?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Team_Lead_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddTeamLeadApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}create-manager`, data);
        const response = await axiosApiHelper('post', `${PROXY}create-manager`, data);
        // console.log('🚀response:', response.data);
        return response.data;
    } catch (error) {
        // console.log('🚀 error:', error);
        return error;
    }
};

export const UpdateTeamLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manager-detail`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-manager-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const TeamLeadGetDetailsApi = (id) => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-manager-detail?manager_id=${id}`);
        const response = await axiosApiHelper('get', `${PROXY}get-manager-detail?manager_id=${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const TeamLeadStatusChangeApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}manager-status-change`, data);
        const response = await axiosApiHelper('post', `${PROXY}manager-status-change`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const TeamLeadDropDownApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-dropdown-managers`);
        const response = await axiosApiHelper('get', `${PROXY}get-dropdown-managers`);
        return response.data;
    } catch (error) {
        return error;
    }
};

/* Cluster Lead */
export const ClusterLeadGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-cluster-leads?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Cluster_Lead_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddClusterLeadApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}create-manager`, data);
        const response = await axiosApiHelper('post', `${PROXY}create-cluster-lead`, data);
        // console.log('🚀response:', response.data);
        return response.data;
    } catch (error) {
        // console.log('🚀 error:', error);
        return error;
    }
};

export const UpdateClusterLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manager-detail`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-cluster-lead-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterLeadGetDetailsApi = (id) => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-manager-detail?manager_id=${id}`);
        const response = await axiosApiHelper('get', `${PROXY}get-cluster-lead-detail?cluster_lead_id=${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterLeadStatusChangeApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}manager-status-change`, data);
        const response = await axiosApiHelper('post', `${PROXY}cluster-lead-status-change`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterLeadDropDownApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-dropdown-managers`);
        const response = await axiosApiHelper('get', `${PROXY}get-dropdown-cluster-lead`);
        return response.data;
    } catch (error) {
        return error;
    }
};
/* BD Api */
export const BDGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-bds?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-bds?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.BD_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddBDApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}create-bd`, data);
        const response = await axiosApiHelper('post', `${PROXY}create-bd`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateBDApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-bd-detail`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-bd-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BDGetDetailsApi = (id) => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-bd-detail?bd_id=${id}`);
        const response = await axiosApiHelper('get', `${PROXY}get-bd-detail?bd_id=${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BdStatusChangeApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}bd-status-change`, data);
        const response = await axiosApiHelper('post', `${PROXY}bd-status-change`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

/* BD target api */
export const BDGetTargetApi =
    (page = '', limit = '', targetMonth = '', targetYear = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-bds?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-bds-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            );
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.BD_Targets_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateBDTargetApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
/* Target Assign */
export const AllTargetGetApi =
    (page = '', limit = '', targetMonth = '', targetYear = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers-targets?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-cluster-leads-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            );
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Targets_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateTargetsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-cluster-lead-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateCompleteTargetApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}complete-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetAllLeadListApi =
    (page = '', limit = '', search = '', leadStatus = '', bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&bd_id=${bdId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Branch_Lead_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllBdeDropdownApi = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-bds-dropdown`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Bde_Dropdown_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BranchUpdateLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-lead`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetFollowUpsDetailApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-lead-followup-calls?lead_id=${data}`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Follow_Ups_Details_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetLeadActivityDetailsApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-lead-activities?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Leads_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddBranchCommentLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-lead-activities`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateBranchLeadStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-lead-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateBranchLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-lead-activities`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
