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
const NewPROXY = `${process.env.REACT_APP_API_URL}api/bd/`;

const initialState = {
    getBdeDropdownList: [],
    getBdeDropdownLoading: true,
    getClDropdownList: [],
    getClDropdownLoading: true,
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
    clusterLeadDetailsList: {},
    clusterLeadDetailsLoading: true,
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
    bdeDetailsDataList: {},
    bdeDetailsDataLoading: true,
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
    getDuplicateLeadList: {
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
    getDuplicateLeadLoading: true,
    getTransferLeadList: {
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
    getTransferLeadLoading: true,
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true,
    getLeadActivityData: [],
    getLeadActivityLoading: true,
    getLeadDropdown: [],
    getLeadDropdownLoading: true,
    getSelectedBdLeadDropdown: [],
    getSelectedBdLeadDropdownLoading: true,
    getCallsList: {
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
    getCallsLoading: true,
    getCallActivityData: [],
    getCallActivityLoading: true,
    getSelectedBDEDropdownList: [],
    getSelectedBDEDropdownLoading: true,
    getRfpList: {
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
    getRfpLoading: true,
    getRfpActivityData: [],
    getRfpActivityLoading: true,
    getProposalList: {
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
    getProposalLoading: true,
    getDSRList: {
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
    getDSRLoading: true,
    getDSRDetails: {},
    getDSRDetailsLoading: true,
    getClusterDSRList: {
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
    getClsuterDSRLoading: true,
    getBranchHeadDSRList: {
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
    getBranchHeadDSRLoading: true,
    getClDropdownSelectedList: [],
    getClDropdownTargetSelectedLoading: true,
    getBdeDropdownSelectedList: [],
    getBdeDropdownSelectedLoading: true,
    getTargetGraphData: { currentMonthTarget: {}, targets: [] },
    getTargetGraphLoading: true,
    getLeadInfoData: {
        leadData: [],
        external_leads: 0,
        internal_leads: 0,
        calls_done: 0,
        initial_calls: 0,
        discussion_leads: 0,
        proposals: 0,
        proposal_amount: 0
    },
    getLeadInfoLoading: true,
    getPerformerData: {
        bdPerformer: [],
        clPerformer: []
    },
    getPerformerLoading: true,
    getDashboardDsrData: {},
    getDashboardDsrLoading: true
};

const slice = createSlice({
    name: 'Cluster-Action',
    initialState,
    reducers: {
        Get_Target_Graph_Success(state, action) {
            state.getTargetGraphData.currentMonthTarget = action.payload?.ResponseData?.currentMonthTarget;
            state.getTargetGraphData.targets = action.payload?.ResponseData?.targets;
            state.getTargetGraphLoading = false;
        },

        Get_Card_Info_Success(state, action) {
            state.getLeadInfoData = action.payload?.ResponseData;
            state.getLeadInfoLoading = false;
        },

        Get_Dashboard_Dsr_Success(state, action) {
            state.getDashboardDsrData = action.payload?.ResponseData;
            state.getDashboardDsrLoading = false;
        },

        Get_Top_Less_Performer_Success(state, action) {
            state.getPerformerData.bdPerformer = action.payload?.ResponseData?.bdPerformer;
            state.getPerformerData.clPerformer = action.payload?.ResponseData?.clPerformer;
            state.getPerformerLoading = false;
        },

        Team_Lead_Get_Success(state, action) {
            state.teamLeadList = action.payload?.ResponseData;
            state.teamLeadLoading = false;
        },

        Cluster_Lead_Get_Success(state, action) {
            state.clusterLeadList = action.payload?.ResponseData;
            state.clusterLeadLoading = false;
        },

        Cluster_Lead_Details_Get_Success(state, action) {
            state.clusterLeadDetailsList = action.payload?.ResponseData;
            state.clusterLeadDetailsLoading = false;
        },
        Bde_Details_Data_Get_Success(state, action) {
            state.bdeDetailsDataList = action.payload?.ResponseData;
            state.bdeDetailsDataLoading = false;
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

        Get_CL_Dropdown_list_Data_Success(state, action) {
            state.getClDropdownList = action.payload?.ResponseData;
            state.getClDropdownLoading = false;
        },

        Get_Selected_Bde_Dropdown_list_Data_Success(state, action) {
            state.getSelectedBDEDropdownList = action.payload?.ResponseData;
            state.getSelectedBDEDropdownLoading = false;
        },

        Branch_Lead_List_Success(state, action) {
            state.getBranchLeadList = action.payload?.ResponseData;
            state.getBranchLeadLoading = false;
        },

        ClearBranchLeadsData(state) {
            state.getBranchLeadList = {
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
            };
            state.getBranchLeadLoading = true;
        },

        Branch_Transfer_Lead_List_Success(state, action) {
            state.getTransferLeadList = action.payload?.ResponseData;
            state.getTransferLeadLoading = false;
        },

        Branch_Duplicate_Lead_List_Success(state, action) {
            state.getDuplicateLeadList = action.payload?.ResponseData;
            state.getDuplicateLeadLoading = false;
        },

        Get_Follow_Ups_Details_Success(state, action) {
            state.getFollowUpsCallsDetails = action.payload?.ResponseData;
            state.getFollowUpsCallsDetailsLoading = false;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
        },

        Leads_Dropdown_Get_List_Success(state, action) {
            state.getLeadDropdown = action.payload?.ResponseData;
            state.getLeadDropdownLoading = false;
        },

        Selected_BD_Leads_Dropdown_Get_List_Success(state, action) {
            state.getSelectedBdLeadDropdown = action.payload?.ResponseData;
            state.getSelectedBdLeadDropdownLoading = false;
        },

        Get_Calls_List_Success(state, action) {
            state.getCallsList = action.payload?.ResponseData;
            state.getCallsLoading = false;
        },

        Call_Details_Activity_Success(state, action) {
            state.getCallActivityData = action.payload?.ResponseData;
            state.getCallActivityLoading = false;
        },

        ClearCallActivityData(state) {
            state.getCallActivityData = [];
            state.getCallActivityLoading = true;
        },

        Get_CL_Dropdown_target_list_Data_Success(state, action) {
            state.getClDropdownSelectedList = action.payload?.ResponseData;
            state.getClDropdownTargetSelectedLoading = false;
        },

        Get_Selected_Bde_Dropdown_Target_list_Data_Success(state, action) {
            state.getBdeDropdownSelectedList = action.payload?.ResponseData;
            state.getBdeDropdownSelectedLoading = false;
        },

        Get_Filter_Target_Success(state, action) {
            state.getFilterTargetDetails = action.payload?.ResponseData;
            state.getFilterTargetDetailsLoading = false;
        },

        Get_RFP_List_Success(state, action) {
            state.getRfpList = action.payload?.ResponseData;
            state.getRfpLoading = false;
        },

        RFP_Details_Activity_Success(state, action) {
            state.getRfpActivityData = action.payload?.ResponseData;
            state.getRfpActivityLoading = false;
        },

        ClearRFPActivityData(state) {
            state.getRfpActivityData = [];
            state.getRfpActivityLoading = true;
        },

        Get_Proposal_List_Success(state, action) {
            state.getProposalList = action.payload?.ResponseData;
            state.getProposalLoading = false;
        },

        Get_DSR_Success(state, action) {
            state.getDSRList = action.payload?.ResponseData;
            state.getDSRLoading = false;
        },

        Get_DSR_Details_Success(state, action) {
            state.getDSRDetails = action.payload?.ResponseData;
            state.getDSRDetailsLoading = false;
        },
        ClearDsrDetails(state) {
            state.getDSRDetails = {};
            state.getDSRDetailsLoading = true;
        },
        Get_Cl_DSR_Success(state, action) {
            state.getClusterDSRList = action.payload?.ResponseData;
            state.getClsuterDSRLoading = false;
        },
        Get_Bh_DSR_Success(state, action) {
            state.getBranchHeadDSRList = action.payload?.ResponseData;
            state.getBranchHeadDSRLoading = false;
        },
        ClearLeadActivityData(state) {
            state.getLeadActivityData = [];
            state.getLeadActivityLoading = true;
        },

        ClearLeadCallDetailsData(state) {
            state.getLeadCallDetailsData = {};
            state.getLeadCallDetailsLoading = true;
        },

        ClearLeadDetailsData(state) {
            state.getLeadDetailsData = {};
            state.getLeadDetailsLoading = true;
        },

        ClearLeadRfpDetailsData(state) {
            state.getRfpDetailsData = {};
            state.getRfpDetailsLoading = true;
        },

        ClearFollowUpCallData(state, action) {
            state.getFollowUpsCallsDetails = {};
            state.getFollowUpsCallsDetailsLoading = true;
        }
    }
});
export const {
    ClearLeadActivityData,
    ClearLeadCallDetailsData,
    ClearLeadDetailsData,
    ClearLeadRfpDetailsData,
    ClearFollowUpCallData,
    ClearDsrDetails,
    ClearCallActivityData,
    ClearRFPActivityData,
    ClearBranchLeadsData
} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Dashboard Api */
export const GetTargetGraphApi =
    (year = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-target-graph?target_year=${year}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Get_Target_Graph_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetDashboardDsrApi =
    (startDate = '', endDate = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-dashboard-dsr?start_date=${startDate}&end_date=${endDate}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Get_Dashboard_Dsr_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetInfoApi =
    (startDate = '', endDate = '', clusterLeadId = '', bdId = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-card-data?start_date=${startDate}&end_date=${endDate}&cluster_lead_id=${clusterLeadId}&bd_id=${bdId}`
            );
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Get_Card_Info_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetTopAndLessPerformerApi =
    (startDate = '', endDate = '', clusterLeadId = '', bdId = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-managers?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-performers?start_date=${startDate}&end_date=${endDate}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Get_Top_Less_Performer_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };
/* Get Managers Api */
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
        if (response.data.succeeded === true && response.data.ResponseCode === 200) {
            dispatch(slice.actions.Cluster_Lead_Details_Get_Success(response.data));
        }
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
        if (response.data.succeeded === true && response.data.ResponseCode === 200) {
            dispatch(slice.actions.Get_CL_Dropdown_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

/* BD Api */
export const BDGetApi =
    (page = '', limit = '', search = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-bds?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper('get', `${PROXY}get-bds?page=${page}&limit=${limit}&search=${search}`);
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
        if (response.data.succeeded === true && response.data.ResponseCode === 200) {
            dispatch(slice.actions.Bde_Details_Data_Get_Success(response.data));
        }
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

/* Targets View ApI */
export const GetClusterLeadSelectedDropDownApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-dropdown-managers`);
        const response = await axiosApiHelper('post', `${PROXY}dropdown-cl-target`, {});
        if (response.data.succeeded === true && response.data.ResponseCode === 200) {
            dispatch(slice.actions.Get_CL_Dropdown_target_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetBdeDropdownSelectedApi = (clValues) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}dropdown-bd-target`, { cluster_lead_id: clValues });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Selected_Bde_Dropdown_Target_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetSelectedClBdeDropdownApi = (clValues) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}get-selected-bde-dropdown`, { selectedCL: clValues });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Selected_Bde_Dropdown_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const BHFilterTargetsApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}get-targets`, data);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Filter_Target_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

/* BD target api */
export const BDGetTargetApi =
    (page = '', limit = '', targetMonth = '', targetYear = '', bdId = '') =>
    async () => {
        try {
            // const response = await axios.get(`${PROXY}get-bds?page=${page}&limit=${limit}`);
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-bds-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}&bd_id=${bdId}`
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

/* Leads Api */
export const GetAllLeadListApi =
    (
        page = '',
        limit = '',
        search = '',
        leadStatus = '',
        clusterLeadId = '',
        bdId = '',
        startDate = '',
        endDate = '',
        requirementType = '',
        leadSource = '',
        leadType = '',
        country = '',
        phoneFilter = ''
    ) =>
    async () => {
        try {
            console.log('Proxy', PROXY);
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&cluster_lead_id=${clusterLeadId}&bd_id=${bdId}&start_date=${startDate}&end_date=${endDate}&lead_req_type_id=${requirementType}&lead_source_id=${leadSource}&lead_type_id=${leadType}&client_country=${country}&with_number=${phoneFilter}`
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

/* Leadss */
export const GetFollowUpsDetailApi =
    (leadId = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-lead-followup-calls?lead_id=${leadId}&start_date=${startDate}&end_date=${endDate}`
            );
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

export const UpdateProjectionStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-projection-status`, data);
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

export const GetAllLeadDropDownApi =
    (bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-lead-dropdown?bd_id=${bdId}`);
            if (response.data.succeeded === true) {
                if (bdId !== '') {
                    dispatch(slice.actions.Selected_BD_Leads_Dropdown_Get_List_Success(response.data));
                } else {
                    dispatch(slice.actions.Leads_Dropdown_Get_List_Success(response.data));
                }
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const TransferLeadApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}transfer-leads`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
export const UploadLeadsDataApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${NewPROXY}upload-leads-data`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* Transfer Leads */
export const GetAllTransferLeadListApi =
    (page = '', limit = '', search = '', leadStatus = '', bdId = '', clusterLeadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-transfer-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&bd_id=${bdId}&cluster_lead_id=${clusterLeadId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Branch_Transfer_Lead_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

/* Duplicate Leads */
export const GetAllDuplicateLeadListApi =
    (page = '', limit = '', search = '', leadStatus = '', bdId = '', clusterLeadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-duplicate-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&bd_id=${bdId}&cluster_lead_id=${clusterLeadId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Branch_Duplicate_Lead_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

/* Calls / Meetings */
export const GetAllCallsApi =
    (
        page = '',
        limit = '',
        search = '',
        leadId = '',
        callStatusId = '',
        bdId = '',
        clusterLeadId = '',
        callTypeId = '',
        startDate = '',
        endDate = ''
    ) =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-lead-call?page=${page}&limit=${limit}&search=${search}&lead_id=${leadId}&call_status_id=${callStatusId}&bd_id=${bdId}&cluster_lead_id=${clusterLeadId}&call_type_id=${callTypeId}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Calls_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateCallsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-call`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetCallActivityDetailsApi =
    (callId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-call-activities?call_id=${callId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Call_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateCallActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-call-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AddCommentCallActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-call-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* RFP */
export const ClusterGetAllRfpRequestApi =
    (page = '', limit = '', search = '', bdId = '', clusterLeadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-rfp?page=${page}&limit=${limit}&search=${search}&bd_id=${bdId}&cluster_lead_id=${clusterLeadId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_RFP_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetRfpActivityDetailsApi =
    (rfpId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-rfp-activities?rfp_id=${rfpId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.RFP_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterUpdateRfpStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-rfp-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterUpdateRfpActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-rfp-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterUpdateRfpRequestApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-rfp`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterAddCommentCallActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-call-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterGetAllProposalApi =
    (page = '', limit = '', search = '', bdId = '', clusterLeadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-proposal?page=${page}&limit=${limit}&search=${search}&bd_id=${bdId}&cluster_lead_id=${clusterLeadId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Proposal_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterUpdateProposalApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-proposal`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* DSR BDE */
export const GetAllDSRApi =
    (page = '', limit = '', startDate = '', endDate = '', clusterLeadId = '', bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-bds-dsr?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&cluster_lead_id=${clusterLeadId}&bd_id=${bdId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_DSR_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetDSRDetaiilApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}bd-dsr-get-detail`, { dsr_id: data });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_DSR_Details_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetAllClusterDSRApi =
    (page = '', limit = '', startDate = '', endDate = '', clusterLeadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-cluster-leads-dsr?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&cluster_lead_id=${clusterLeadId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Cl_DSR_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllBranchHeadDSRApi =
    (page = '', limit = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-dsr?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Bh_DSR_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };
