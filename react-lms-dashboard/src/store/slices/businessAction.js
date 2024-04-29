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

const PROXY = `${process.env.REACT_APP_API_URL}api/bd/`;

const initialState = {
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
    getLeadDropdown: [],
    getLeadDropdownLoading: true,
    getCallActivityData: [],
    getCallActivityLoading: true,
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
        totalCalls: 0,
        totalLeads: 0,
        totalProposalAmount: 0,
        totalProposals: 0,
        totalRFPs: 0
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
    getDSRDetails: {},
    getDSRDetailsLoading: true,
    getFollowUpsCallsDetails: {},
    getFollowUpsCallsDetailsLoading: true,
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true
};

const slice = createSlice({
    name: 'Business-Action',
    initialState,
    reducers: {
        // Admin Login successfull
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

        Bd_Leads_Get_List_Success(state, action) {
            state.getLeadsList = action.payload?.ResponseData;
            state.getLeadsLoading = false;
        },

        ClearBdeLeadsData(state) {
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

        Leads_Dropdown_Get_List_Success(state, action) {
            state.getLeadDropdown = action.payload?.ResponseData;
            state.getLeadDropdownLoading = false;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
        },

        ClearLeadActivityData(state) {
            state.getLeadActivityData = [];
            state.getLeadActivityLoading = true;
        },

        Get_Calls_List_Success(state, action) {
            state.getCallsList = action.payload?.ResponseData;
            state.getCallsLoading = false;
        },
        ClearMeetingData(state) {
            state.getCallsList = {
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
            state.getCallsLoading = true;
        },

        Call_Details_Activity_Success(state, action) {
            state.getCallActivityData = action.payload?.ResponseData;
            state.getCallActivityLoading = false;
        },

        ClearCallActivityData(state) {
            state.getCallActivityData = [];
            state.getCallActivityLoading = true;
        },

        Get_RFP_List_Success(state, action) {
            state.getRfpList = action.payload?.ResponseData;
            state.getRfpLoading = false;
        },
        ClearRFPListData(state) {
            state.getRfpList = {
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
            state.getRfpLoading = true;
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

        ClearProposalListData(state) {
            state.getProposalList = {
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
            state.getProposalLoading = true;
        },

        Get_DSR_Success(state, action) {
            state.getDSRList = action.payload?.ResponseData;
            state.getDSRLoading = false;
        },

        ClearDsrListData(state, action) {
            state.getDSRList = {
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
            state.getDSRLoading = true;
        },

        Get_DSR_Details_Success(state, action) {
            state.getDSRDetails = action.payload?.ResponseData;
            state.getDSRDetailsLoading = false;
        },

        ClearDsrDetails(state, action) {
            state.getDSRDetails = {};
            state.getDSRDetailsLoading = true;
        },

        Get_Follow_Ups_Details_Success(state, action) {
            state.getFollowUpsCallsDetails = action.payload?.ResponseData;
            state.getFollowUpsCallsDetailsLoading = false;
        },

        ClearFollowUpCallData(state, action) {
            state.getFollowUpsCallsDetails = {};
            state.getFollowUpsCallsDetailsLoading = true;
        },

        Get_Filter_Target_Success(state, action) {
            state.getFilterTargetDetails = action.payload?.ResponseData;
            state.getFilterTargetDetailsLoading = false;
        }
    }
});

export const {
    ClearLeadRfpDetailsData,
    ClearLeadCallDetailsData,
    ClearLeadDetailsData,
    ClearLeadActivityData,
    ClearCallActivityData,
    ClearRFPActivityData,
    ClearDsrDetails,
    ClearFollowUpCallData,
    ClearAllFollowUpsData,
    ClearAllCallsData,
    ClearAllRFPData,
    ClearBdeLeadsData,
    ClearMeetingData,
    ClearRFPListData,
    ClearProposalListData,
    ClearDsrListData
} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Lead Crud */
export const GetAllLeadApi =
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
                dispatch(slice.actions.Bd_Leads_Get_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddLeadApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('post', `${PROXY}add-lead`, data);
        return response.data;
    } catch (error) {
        return error.response;
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

export const UpdateCompleteTargetsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}complete-bd-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}complete-bd-target`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetLeadActivityDetailsApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-lead-activity?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Leads_Details_Activity_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const UpdateLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-lead-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const RescheduledFollowUpsApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-followup-date`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AddCommentLeadActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-lead-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetAllLeadDropDownApi = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-dropdown-leads`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Leads_Dropdown_Get_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
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

export const AddLeadResponseApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('post', `${PROXY}add-lead-response`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
/* Calls Api */

export const GetAllCallsApi =
    (page = '', limit = '', search = '', leadId = '', callStatusId = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-lead-call?page=${page}&limit=${limit}&search=${search}&lead_id=${leadId}&call_status_id=${callStatusId}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Calls_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddCallsApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-call`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
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

/* RFP Request */
export const GetAllRfpRequestApi =
    (page = '', limit = '', search = '', rfpStatusId = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-rfp?page=${page}&limit=${limit}&search=${search}&lead_rfp_status_id=${rfpStatusId}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_RFP_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddRfpRequestApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-rfp`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateRfpRequestApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-rfp`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetRfpActivityDetailsApi =
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

export const UpdateRfpActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-rfp-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AddCommentRfpActivityApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-manger-target`, data);
        const response = await axiosApiHelper('put', `${PROXY}add-comment-rfp-activity`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateRfpStatusApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-rfp-status`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateProposalValueRFP = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-rfp-proposal-value`, data);
        // if (response.data.succeeded === true) {
        //     dispatch(slice.actions.Get_DSR_Details_Success(response.data));
        // }
        return response.data;
    } catch (error) {
        return error;
    }
};
/* Proposal Api */

export const GetAllProposalApi =
    (page = '', limit = '', search = '', proposalTypeData = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-proposal?page=${page}&limit=${limit}&search=${search}&proposal_type_id=${proposalTypeData}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Proposal_List_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddProposalApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-proposal`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateProposalApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-proposal`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/* Dashboard Api */

export const GetAllDashboardDataApi =
    (startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}dashboard?start_date=${startDate}&end_date=${endDate}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Dashboard_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetDashboardGraphApi =
    (startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}dashboard-graph?start_date=${startDate}&end_date=${endDate}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Dashboard_Graph_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllFollowUpsDataApi =
    (startDate = '', endDate = '', page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}dashboard-followup-leads?start_date=${startDate}&end_date=${endDate}&page=${page}&limit=${limit}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_FollowUps_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllCallsDataApi =
    (startDate = '', endDate = '', page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}dashboard-call-leads?start_date=${startDate}&end_date=${endDate}&page=${page}&limit=${limit}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Calls_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllRfpDataApi =
    (startDate = '', endDate = '', page = '', limit = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}dashboard-rfp-leads?start_date=${startDate}&end_date=${endDate}&page=${page}&limit=${limit}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Rfp_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetLeadDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-lead-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Lead_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetCallDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-call-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Lead_Call_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetRfpDetailsDataApi =
    (leadId = '') =>
    async () => {
        try {
            const response = await axiosApiHelper('get', `${PROXY}get-rfp-details?lead_id=${leadId}`);
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Rfp_Details_Data_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const GetAllDSRApi =
    (page = '', limit = '', startDate = '', endDate = '') =>
    async () => {
        try {
            const response = await axiosApiHelper(
                'get',
                `${PROXY}get-dsr-report?page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}`
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
        const response = await axiosApiHelper('post', `${PROXY}get-dsr-report-detail`, { dsr_id: data });
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Get_DSR_Details_Success(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateDSRApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-dsr-report`, data);
        // if (response.data.succeeded === true) {
        //     dispatch(slice.actions.Get_DSR_Details_Success(response.data));
        // }
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
                `${PROXY}get-lead-followup-call?lead_id=${leadId}&start_date=${startDate}&end_date=${endDate}`
            );
            if (response.data.succeeded === true) {
                dispatch(slice.actions.Get_Follow_Ups_Details_Success(response.data));
            }
            return response.data;
        } catch (error) {
            return error;
        }
    };

export const AddFollowUpsCallApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-lead-followup-call`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const FilterTargetsApi = (data) => async () => {
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
