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
    requirementTypeList: [],
    requirementTypeLoading: true,
    leadSourceList: [],
    leadSourceListLoading: true,
    leadTypeList: [],
    leadTypeLoading: true,
    leadStatusList: [],
    leadStatusLoading: true,
    leadFollowUpList: [],
    leadFollowUpLoading: true,
    callModeList: [],
    callModeLoading: true,
    callTypeList: [],
    callTypeLoading: true,
    callStatusList: [],
    callStatusLoading: true,
    rfpTypeList: [],
    rfpTypeLoading: true,
    rfpStatusList: [],
    rfpStatusLoading: true,
    leadRfpStatusList: [],
    leadRfpStatusLoading: true,
    proposalTypeList: [],
    proposalTypeLoading: true,
    proposalStatusList: [],
    proposalStatusLoading: true,
    leadProposalStatusList: [],
    leadProposalStatusLoading: true,
    preDefineNotesList: [],
    preDefineNotesLoading: true
};

const slice = createSlice({
    name: 'Master-Status',
    initialState,
    reducers: {
        // Admin Login successfull
        Requirement_Type_List_Success(state, action) {
            state.requirementTypeList = action.payload?.ResponseData;
            state.requirementTypeLoading = false;
        },

        Lead_Source_List_Success(state, action) {
            state.leadSourceList = action.payload?.ResponseData;
            state.leadSourceListLoading = false;
        },

        Lead_Type_List_Success(state, action) {
            state.leadTypeList = action.payload?.ResponseData;
            state.leadTypeLoading = false;
        },

        Lead_Status_List_Success(state, action) {
            state.leadStatusList = action.payload?.ResponseData;
            state.leadStatusLoading = false;
        },

        Lead_Follow_Ups_List_Success(state, action) {
            state.leadFollowUpList = action.payload?.ResponseData;
            state.leadFollowUpLoading = false;
        },

        Call_Mode_List_Success(state, action) {
            state.callModeList = action.payload?.ResponseData;
            state.callModeLoading = false;
        },

        Call_Type_List_Success(state, action) {
            state.callTypeList = action.payload?.ResponseData;
            state.callTypeLoading = false;
        },

        Call_Status_List_Success(state, action) {
            state.callStatusList = action.payload?.ResponseData;
            state.callStatusLoading = false;
        },

        Rfp_Type_List_Success(state, action) {
            state.rfpTypeList = action.payload?.ResponseData;
            state.rfpTypeLoading = false;
        },

        Rfp_Status_List_Success(state, action) {
            state.rfpStatusList = action.payload?.ResponseData;
            state.rfpStatusLoading = false;
        },

        Lead_Rfp_Status_List_Success(state, action) {
            state.leadRfpStatusList = action.payload?.ResponseData;
            state.leadRfpStatusLoading = false;
        },

        Proposal_Type_List_Success(state, action) {
            state.proposalTypeList = action.payload?.ResponseData;
            state.proposalTypeLoading = false;
        },

        Proposal_Status_List_Success(state, action) {
            state.proposalStatusList = action.payload?.ResponseData;
            state.proposalStatusLoading = false;
        },

        Lead_Proposal_Status_List_Success(state, action) {
            state.leadProposalStatusList = action.payload?.ResponseData;
            state.leadProposalStatusLoading = false;
        },

        Pre_Define_Notes_List_Success(state, action) {
            state.preDefineNotesList = action.payload?.ResponseData;
            state.preDefineNotesLoading = false;
        }
    }
});

// export const {} = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
/* Common Table Apis */

/* Requirement Type */
export const RequirementTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-req-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=requirement_type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Requirement_Type_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Lead Source */
export const LeadSourceGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-lead-source`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_source`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Source_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Lead Type */
export const LeadTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-lead-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Type_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Lead Status */
export const LeadStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-lead-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Lead Follow-ups */
export const LeadFollowUpsGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-pre-define-notes`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_follow_ups`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Follow_Ups_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Call Mode */
export const CallModeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-mode`);call_mode
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=call_mode`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Call_Mode_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Call Type */
export const CallTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=call_type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Call_Type_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Call Status */
export const CallStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=call_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Call_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* RFP Type */
export const RfpTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=rfp_type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Rfp_Type_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* RFP Status */
export const RfpStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=rfp_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Rfp_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Lead RFP Type */
export const LeadRfpStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_rfp_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Rfp_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Proposal Type */
export const ProposalTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-proposal-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=proposal_type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Proposal_Type_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Proposal Status Update */
export const ProposalStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-proposal-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=proposal_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Proposal_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

/* Proposal Status Update */
export const LeadProposalStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-proposal-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=lead_proposal_status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Lead_Proposal_Status_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const PreDefineNotesGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-pre-define-notes`);
        const response = await axiosApiHelper('get', `${PROXY}get-master-status?status_type=pre_define_notes`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Pre_Define_Notes_List_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const MasterRfpStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-lead-rfp-status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Master_Rfp_Status_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const MasterCallStatusGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-lead-call-status`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Master_Call_Status_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const MasterLeadRfpTypeGetApi = () => async () => {
    try {
        // const response = await axios.get(`${PROXY}get-call-type`);
        const response = await axiosApiHelper('get', `${PROXY}get-lead-rfp-type`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Master_Lead_Rfp_Type_Success(response.data));
        }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const AddMasterStatusApi = (data) => async () => {
    try {
        // const response = await axios.post(`${PROXY}add-pre-define-notes`, data);
        const response = await axiosApiHelper('post', `${PROXY}add-master-status`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateMasterStatusApi = (data) => async () => {
    try {
        // const response = await axios.put(`${PROXY}update-pre-define-notes`, data);
        const response = await axiosApiHelper('put', `${PROXY}update-master-status`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
