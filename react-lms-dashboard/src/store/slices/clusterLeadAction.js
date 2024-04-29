// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import axios from 'utils/axios';
import { dispatch } from '../index';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------
// const config = {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

const PROXY = `${process.env.REACT_APP_API_URL}api/cluster-lead/`;

const initialState = {
    getBdeDropdownList: [],
    getBdeDropdownLoading: true,
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
    getBdeLoading: true,
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
    getClusterBdeList: {
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
    getClusterBdeLoading: true,
    getClusterLeadList: {
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
    getClusterLeadLoading: true,
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
    getLeadDropdown: [],
    getLeadDropdownLoading: true,
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
    getDashboardData: {
        bdTargets: {},
        leadData: [],
        lead_type: {
            date: [],
            Upwork: [],
            Email: [],
            LinkedIn: []
        },
        totalCalls: [],
        totalLeads: [],
        totalProposalAmount: 0,
        totalProposals: [],
        totalRFPs: []
    },
    getDashboardLoading: true,
    getDashboardGraphData: {
        date: [],
        Upwork: [],
        Email: [],
        LinkedIn: []
    },
    getDashboardGraphLoading: true,
    getFollowUpsListData: {
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
    getFollowUpsListLoading: true,
    getCallsListData: {
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
    getCallsListLoading: true,
    getRfpListData: {
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
    getRfpListLoading: true,
    getLeadDetailsData: {},
    getLeadDetailsLoading: true,
    getLeadCallDetailsData: {},
    getLeadCallDetailsLoading: true,
    getRfpDetailsData: {},
    getRfpDetailsLoading: true,
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
    getDSRDetails: {},
    getDSRDetailsLoading: true,
    getFollowUpsCallsDetails: {},
    getFollowUpsCallsDetailsLoading: true,
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true
};

const slice = createSlice({
    name: 'Cluster-Lead-Action',
    initialState,
    reducers: {
        // Admin Login successfull
        Get_Bde_Dropdown_list_Data_Success(state, action) {
            state.getBdeDropdownList = action.payload?.ResponseData;
            state.getBdeDropdownLoading = false;
        },

        Get_Dashboard_Data_Success(state, action) {
            state.getDashboardData.leadData = action.payload?.ResponseData?.leadData;
            state.getDashboardData.bdTargets = action.payload?.ResponseData?.bdTargets;
            // state.getDashboardData.lead_type.date = action.payload?.ResponseData?.lead_type?.date;
            // state.getDashboardData.lead_type.Upwork = action.payload?.ResponseData?.lead_type?.Upwork;
            // state.getDashboardData.lead_type.Email = action.payload?.ResponseData?.lead_type?.Email;
            // state.getDashboardData.lead_type.LinkedIn = action.payload?.ResponseData?.lead_type?.LinkedIn;
            state.getDashboardData.totalCalls = action.payload?.ResponseData?.totalCalls;
            state.getDashboardData.totalLeads = action.payload?.ResponseData?.totalLeads;
            state.getDashboardData.totalProposalAmount = action.payload?.ResponseData?.totalProposalAmount;
            state.getDashboardData.totalProposals = action.payload?.ResponseData?.totalProposals;
            state.getDashboardData.totalRFPs = action.payload?.ResponseData?.totalRFPs;
            state.getDashboardLoading = false;
        },

        Get_Dashboard_Graph_Success(state, action) {
            state.getDashboardGraphData.date = action.payload?.ResponseData?.date;
            state.getDashboardGraphData.Upwork = action.payload?.ResponseData?.Upwork;
            state.getDashboardGraphData.Email = action.payload?.ResponseData?.Email;
            state.getDashboardGraphData.LinkedIn = action.payload?.ResponseData?.LinkedIn;
            state.getDashboardGraphLoading = false;
        },

        Get_FollowUps_Data_Success(state, action) {
            state.getFollowUpsListData = action.payload?.ResponseData;
            state.getFollowUpsListLoading = false;
        },
        ClearAllFollowUpsData(state) {
            state.getFollowUpsListData = {
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
            state.getFollowUpsListLoading = true;
        },
        Get_Calls_Data_Success(state, action) {
            state.getCallsListData = action.payload?.ResponseData;
            state.getCallsListLoading = false;
        },
        ClearAllCallsData(state) {
            state.getCallsListData = {
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
            state.getCallsListLoading = true;
        },
        Get_Rfp_Data_Success(state, action) {
            state.getRfpListData = action.payload?.ResponseData;
            state.getRfpListLoading = false;
        },
        ClearAllRFPData(state) {
            state.getRfpListData = {
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
            state.getRfpListLoading = true;
        },
        Get_Lead_Details_Data_Success(state, action) {
            state.getLeadDetailsData = action.payload?.ResponseData[0];
            state.getLeadDetailsLoading = false;
        },
        Get_Rfp_Details_Data_Success(state, action) {
            state.getRfpDetailsData = action.payload?.ResponseData[0];
            state.getRfpDetailsLoading = false;
        },

        Get_Lead_Call_Details_Data_Success(state, action) {
            state.getLeadCallDetailsData = action.payload?.ResponseData[0];
            state.getLeadCallDetailsLoading = false;
        },

        ClearLeadDetailsData(state) {
            state.getLeadDetailsData = {};
            state.getLeadDetailsLoading = true;
        },
        ClearLeadCallDetailsData(state) {
            state.getLeadCallDetailsData = {};
            state.getLeadCallDetailsLoading = true;
        },
        ClearLeadRfpDetailsData(state) {
            state.getRfpDetailsData = {};
            state.getRfpDetailsLoading = true;
        },
        Get_Bde_List_Success(state, action) {
            state.getBdeList = action.payload?.ResponseData;
            state.getBdeLoading = false;
        },

        Bd_Target_Get_List_Success(state, action) {
            state.bdTargetList = action.payload?.ResponseData;
            state.bdTargetLoading = false;
        },

        Cluster_Bde_Get_List_Success(state, action) {
            state.getClusterBdeList = action.payload?.ResponseData;
            state.getClusterBdeLoading = false;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
        },

        ClearLeadActivityData(state) {
            state.getLeadActivityData = [];
            state.getLeadActivityLoading = true;
        },

        Cluster_Lead_List_Success(state, action) {
            state.getClusterLeadList = action.payload?.ResponseData;
            state.getClusterLeadLoading = false;
        },

        ClearClusterLeadLeadsData(state) {
            state.getClusterLeadList = {
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
            state.getClusterLeadLoading = true;
        },

        Get_Calls_List_Success(state, action) {
            state.getCallsList = action.payload?.ResponseData;
            state.getCallsLoading = false;
        },

        Leads_Dropdown_Get_List_Success(state, action) {
            state.getLeadDropdown = action.payload?.ResponseData;
            state.getLeadDropdownLoading = false;
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

        ClearRFPActivityData(state) {
            state.getRfpActivityData = [];
            state.getRfpActivityLoading = true;
        },

        Get_Proposal_List_Success(state, action) {
            state.getProposalList = action.payload?.ResponseData;
            state.getProposalLoading = false;
        },

        ClearCallActivityData(state) {
            state.getCallActivityData = [];
            state.getCallActivityLoading = true;
        },
        Get_DSR_Success(state, action) {
            state.getDSRList = action.payload?.ResponseData;
            state.getDSRLoading = false;
        },

        Get_DSR_Details_Success(state, action) {
            state.getDSRDetails = action.payload?.ResponseData;
            state.getDSRDetailsLoading = false;
        },

        Get_Cl_DSR_Success(state, action) {
            state.getClusterDSRList = action.payload?.ResponseData;
            state.getClsuterDSRLoading = false;
        },

        ClearDsrDetails(state) {
            state.getDSRDetails = {};
            state.getDSRDetailsLoading = true;
        },
        Get_Follow_Ups_Details_Success(state, action) {
            state.getFollowUpsCallsDetails = action.payload?.ResponseData;
            state.getFollowUpsCallsDetailsLoading = false;
        },

        ClearFollowUpCallData(state) {
            state.getFollowUpsCallsDetails = {};
            state.getFollowUpsCallsDetailsLoading = true;
        },

        Get_Cl_Filter_Target_Success(state, action) {
            state.getFilterTargetDetails = action.payload?.ResponseData;
            state.getFilterTargetDetailsLoading = false;
        }
    }
});
export const {
    ClearLeadActivityData,
    ClearCallActivityData,
    ClearLeadCallDetailsData,
    ClearLeadDetailsData,
    ClearLeadRfpDetailsData,
    ClearDsrDetails,
    ClearFollowUpCallData,
    ClearAllFollowUpsData,
    ClearAllCallsData,
    ClearAllRFPData,
    ClearClusterLeadLeadsData
} = slice.actions;

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Dashboard Api */
export const ClusterGetAllBdeDropdownApi = () => async () => {
    try {
        // const response = await axiosApiHelper('get', `${PROXY}cl-get-bds-dropdown-list`);
        const response = await axiosApiHelper('post', `${PROXY}get-bds-target-dropdown`, {
            cluster_lead_id: []
        });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Bde_Dropdown_list_Data_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ClusterGetAllDashboardDataApi =
    (startDate = '', endDate = '', bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-dashboard?start_date=${startDate}&end_date=${endDate}&bd_id=${bdId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Dashboard_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterLeadDashboardGraphApi =
    (startDate = '', endDate = '', bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-dashboard-graph?start_date=${startDate}&end_date=${endDate}&bd_id=${bdId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Dashboard_Graph_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetAllFollowUpsDataApi =
    (startDate = '', endDate = '', bdId = '', page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-dashboard-followup-leads?start_date=${startDate}&end_date=${endDate}&bd_id=${bdId}&page=${page}&limit=${limit}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_FollowUps_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterRescheduledFollowUpsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-followup-date`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterGetAllCallsDataApi =
    (startDate = '', endDate = '', bdId = '', page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-dashboard-call-leads?start_date=${startDate}&end_date=${endDate}&bd_id=${bdId}&page=${page}&limit=${limit}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Calls_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetAllRfpDataApi =
    (startDate = '', endDate = '', bdId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-dashboard-rfp-leads?start_date=${startDate}&end_date=${endDate}&bd_id=${bdId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Rfp_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetLeadDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-lead-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Lead_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetCallDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-call-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Lead_Call_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetRfpDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-rfp-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Rfp_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

/* Leads */
export const GetAllLeadListApi =
    (
        page = '',
        limit = '',
        search = '',
        leadStatus = '',
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
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-get-leads?page=${page}&limit=${limit}&search=${search}&lead_status_id=${leadStatus}&bd_id=${bdId}&start_date=${startDate}&end_date=${endDate}&lead_req_type_id=${requirementType}&lead_source_id=${leadSource}&lead_type_id=${leadType}&client_country=${country}&with_number=${phoneFilter}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Cluster_Lead_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetLeadActivityDetailsApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-lead-activity?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Leads_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterUpdateLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-lead`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateClusterLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-lead-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AddClusterCommentLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-add-comment-lead-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateClusterLeadStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}cl-update-lead-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateClusterLeadProjectionStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-projection-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterGetAllLeadDropDownApi = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}cl-get-dropdown-leads`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Leads_Dropdown_Get_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

/* Calls */
export const ClusterGetAllCallsApi =
    (page = '', limit = '', search = '', leadId = '', bdId = '', startDate = '', endDate = '', callStatusId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-get-lead-call?page=${page}&limit=${limit}&search=${search}&lead_id=${leadId}&bd_id=${bdId}&start_date=${startDate}&end_date=${endDate}&call_status_id=${callStatusId}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Calls_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterGetCallActivityDetailsApi =
    (callId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-call-activities?call_id=${callId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Call_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClusterAddCommentCallActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-add-comment-call-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterUpdateCallActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-call-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const CluserUpdateCallsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-call`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* BDE Crud */
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

export const TeamBdeGetListApi =
    (page = '', limit = '', search = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}cl-get-bds-list?page=${page}&limit=${limit}&search=${search}`);
            if (response.data.succeeded === true && response.data.ResponseCode === 200) {
                dispatch(slice.actions.Cluster_Bde_Get_List_Success(response.data));
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
                `${PROXY}cl-get-bds-targets?page=${page}&limit=${limit}&targetMonth=${targetMonth}&targetYear=${targetYear}`
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
        const response = await axiosApiHelper('put', `${PROXY}cl-update-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateCompleteTargetsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}complete-bd-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-complete-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* RFP Crud */
export const ClusterGetAllRfpRequestApi =
    (page = '', limit = '', search = '', bdId = '', startDate = '', endDate = '', rfpStatusId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-get-rfp?page=${page}&limit=${limit}&search=${search}&bd_id=${bdId}&start_date=${startDate}&end_date=${endDate}&rfp_status_id=${rfpStatusId}`
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
            const response = await axiosApiHelper('get', `${PROXY}cl-get-rfp-activities?rfp_id=${rfpId}`);
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
        const response = await axiosApiHelper('put', `${PROXY}cl-update-rfp-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterUpdateRfpActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}cl-update-rfp-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ClusterUpdateRfpRequestApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}cl-update-rfp`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* Proposal */
export const ClusterGetAllProposalApi =
    (page = '', limit = '', search = '', bdId = '', proposalTypeId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-get-proposal?page=${page}&limit=${limit}&search=${search}&bd_id=${bdId}&proposal_type_id=${proposalTypeId}`
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
        const response = await axiosApiHelper('put', `${PROXY}cl-update-proposal`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetAllDSRApi =
    (page = '', limit = '', search = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-bd-dsr-get?page=${page}&limit=${limit}&search=${search}&start_date=${startDate}&end_date=${endDate}`
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
    (page = '', limit = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-cl-dsr?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Cl_DSR_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const ClFilterTargetsApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}cl-get-bds-targets`, data);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_Cl_Filter_Target_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetDSRDetaiilApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}cl-bd-dsr-get-detail`, { dsr_id: data });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_DSR_Details_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetFollowUpsDetailApi =
    (leadId = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}cl-get-lead-followup-call?lead_id=${leadId}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Follow_Ups_Details_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };
