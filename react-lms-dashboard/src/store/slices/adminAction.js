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
    countryLeadList: {
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
    countryLeadLoading: true,
    countryLeadDetails: {},
    countryLeadDetailsLoading: true,
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
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true,
    getBranchDropdownSelectedList: [],
    getBranchDropdownSelectedLoading: true,
    getClDropdownSelectedList: [],
    getClDropdownTargetSelectedLoading: true,
    getBdeDropdownSelectedList: [],
    getBdeDropdownSelectedLoading: true,
    activeBranchList: [],
    clusterDetails: {},
    getLeadsList: {
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
    getLeadsLoading: true,
    getLeadActivityData: [],
    getLeadActivityLoading: true,
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
    getBranchHeadDSRLoading: true
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

        Country_lead_Get_Success(state, action) {
            state.countryLeadList = action.payload?.ResponseData;
            state.countryLeadLoading = false;
        },

        Country_lead_Details_Get_Success(state, action) {
            state.countryLeadDetails = action.payload?.ResponseData;
            state.countryLeadDetailsLoading = false;
        },

        Active_Branch_List_Success(state, action) {
            state.activeBranchList = action.payload?.ResponseData;
        },

        Admin_Leads_Get_List_Success(state, action) {
            state.getLeadsList = action.payload?.ResponseData;
            state.getLeadsLoading = false;
        },

        ClearAdminLeadsData(state) {
            state.getLeadsList = {
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
            state.getLeadsLoading = true;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
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

        ClearFollowUpCallData(state) {
            state.getFollowUpsCallsDetails = {};
            state.getFollowUpsCallsDetailsLoading = true;
        },

        Get_Filter_Target_Success(state, action) {
            state.getFilterTargetDetails = action.payload?.ResponseData;
            state.getFilterTargetDetailsLoading = false;
        },

        Get_Branch_Dropdown_list_Data_Success(state, action) {
            state.getBranchDropdownSelectedList = action.payload?.ResponseData;
            state.getBranchDropdownSelectedLoading = false;
        },

        Get_CL_Dropdown_target_list_Data_Success(state, action) {
            state.getClDropdownSelectedList = action.payload?.ResponseData;
            state.getClDropdownTargetSelectedLoading = false;
        },

        Get_Selected_Bde_Dropdown_Target_list_Data_Success(state, action) {
            state.getBdeDropdownSelectedList = action.payload?.ResponseData;
            state.getBdeDropdownSelectedLoading = false;
        },

        Get_Calls_List_Success(state, action) {
            state.getCallsList = action.payload?.ResponseData;
            state.getCallsLoading = false;
        },

        Call_Details_Activity_Success(state, action) {
            state.getCallActivityData = action.payload?.ResponseData;
            state.getCallActivityLoading = false;
        },

        Get_RFP_List_Success(state, action) {
            state.getRfpList = action.payload?.ResponseData;
            state.getRfpLoading = false;
        },

        RFP_Details_Activity_Success(state, action) {
            state.getRfpActivityData = action.payload?.ResponseData;
            state.getRfpActivityLoading = false;
        },

        Get_Proposal_List_Success(state, action) {
            state.getProposalList = action.payload?.ResponseData;
            state.getProposalLoading = false;
        },

        Get_DSR_Success(state, action) {
            state.getDSRList = action.payload?.ResponseData;
            state.getDSRLoading = false;
        },

        Get_Cl_DSR_Success(state, action) {
            state.getClusterDSRList = action.payload?.ResponseData;
            state.getClsuterDSRLoading = false;
        },
        Get_Bh_DSR_Success(state, action) {
            state.getBranchHeadDSRList = action.payload?.ResponseData;
            state.getBranchHeadDSRLoading = false;
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
    ClearAdminLeadsData
} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Dropdown Api */
export const GetBranchSelectedDropDownApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-dropdown-managers`);
        const response = await axiosApiHelper('post', `${PROXY}dropdown-cl-target`, {});
        if (response.data.succeeded === true && response.data.ResponseCode === 200) {
            dispatch(slice.actions.Get_Branch_Dropdown_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

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
                `${PROXY}admin-get-bd-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            );
            // const response = await axios.get(
            //     `${PROXY}get-branch-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
            // );
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

export const FilterTargetsApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}admin-get-targets`, data);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Filter_Target_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
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

/* Cluster Crud */
export const CountryLeadGetApi =
    (page = '', limit = '') =>
    async () => {
        try {
            const response = await axios.get(`${PROXY}get-country-leads?page=${page}&limit=${limit}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Country_lead_Get_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const CountryLeadGetDetailsApi = (id) => async () => {
    try {
        const response = await axios.get(`${PROXY}get-country-lead-detail?country_lead_id=${id}`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Country_lead_Details_Get_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const AddCountryLeadApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}create-country-lead`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateCountryLeadApi = (data) => async () => {
    try {
        const response = await axios.put(`${PROXY}update-country-lead-detail`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const CountryLeadStatusChangeApi = (data) => async () => {
    try {
        const response = await axios.post(`${PROXY}country-lead-status-change`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

/* Leads */
export const GetAllAdminLeadApi =
    (
        page = '',
        limit = '',
        search = '',
        leadStatus = '',
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
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&start_date=${startDate}&end_date=${endDate}&lead_req_type_id=${requirementType}&lead_source_id=${leadSource}&lead_type_id=${leadType}&client_country=${country}&with_number=${phoneFilter}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Admin_Leads_Get_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-lead`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
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

export const AddCommentLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-lead-activities`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateLeadStatusApi = (data) => async () => {
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

export const UpdateLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-lead-activities`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
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

/* DSR Report */
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
                `${PROXY}get-cluster-dsr?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Bh_DSR_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };
