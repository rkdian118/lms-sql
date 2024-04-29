/* eslint-disable radix */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import {
    Grid,
    Box,
    Chip,
    Tab,
    Tabs,
    Typography,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Button,
    TableRow,
    IconButton,
    TableCell,
    Collapse,
    TableContainer,
    Stack,
    Table,
    TableBody,
    TableHead,
    TablePagination
} from '@mui/material';
import { Link } from 'react-router-dom';
// project imports
import { useTheme, styled } from '@mui/material/styles';

// assets
import MuiTypography from '@mui/material/Typography';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LeadDetailModel from './Models/LeadDetailModel';
import { connect, useSelector } from 'react-redux';
import { ClusterFollowUpsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import moment from 'moment';
import { dispatch } from 'store';
import { ClearLeadDetailsData, ClusterGetAllFollowUpsDataApi, GetFollowUpsDetailApi } from 'store/slices/clusterLeadAction';
import { getLeadStatusColor } from 'Helper/StatusColor';
import UpdateFollowUpsModel from './Models/UpdateFollowUpsModel';

import { LeadStatusGetApi } from 'store/slices/masterAction';
// import LeadDetailModel from './Models/LeadDetailModel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import HistoryIcon from '@mui/icons-material/History';
import RescheduledFollowUps from './Models/RescheduledFollowUps';
import FollowUpsCalls from 'views/ClusterLead/Leads/FollowUpsCalls';
import CallIcon from '@mui/icons-material/Call';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { openSnackbar } from 'store/slices/snackbar';
import UpdateLeadStatus from 'views/ClusterLead/Leads/UpdateLeadStatus';
import UpdateProjection from 'views/ClusterLead/Leads/UpdateProjection';

function Row({ row, key, currentPage, pageLength, compareDate, bdeData, startDate, endDate }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openFollowUpsModel, setOpenFollowUpsModel] = useState(false);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [activityId, setActivityId] = useState('');
    const [followUpsId, setFollowUpsId] = useState('');
    const [openStatus, setOpenStatus] = useState(false);
    const [leadStatusId, setLeadStatus] = React.useState('');
    const [rescheduledFollowUps, setRescheduledFollowUps] = React.useState(false);
    const [openFollowUp, setOpenFollowUp] = React.useState(false);
    const [openProjectStatus, setOpenProjectStatus] = React.useState(false);
    const [projectStatusId, setProjectStatusId] = React.useState('');

    const onClickModel = (data) => {
        setOpenModelDetail(true);
        setOpenFollowUpsModel(false);
        setOpenStatus(false);
        setOpenProjectStatus(false);
        setId(data);
    };

    const onClickFollowUpsModel = (data) => {
        setOpenFollowUpsModel(true);
        setOpenModelDetail(false);
        setOpenStatus(false);
        setOpenProjectStatus(false);
        setActivityId(data?.resp?._id);
        setFollowUpsId(data?.updateValue?._id);
        setId(data._id);
    };

    const onRescheduleFollowUpsModel = (data) => {
        setRescheduledFollowUps(true);
        setOpenFollowUpsModel(false);
        setOpenModelDetail(false);
        setOpenStatus(false);
        setOpenProjectStatus(false);
        setActivityId(data?.resp?._id);
        setFollowUpsId(data?.updateValue?._id);
        setId(data._id);
    };

    const onCloseFollowUpsModel = () => {
        setId('');
        setActivityId('');
        setFollowUpsId('');
        setOpenFollowUpsModel(false);
        setOpenFollowUp(false);
        setOpenStatus(false);
        setOpenProjectStatus(false);
        setOpenModelDetail(false);
        setRescheduledFollowUps(false);
        dispatch(ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, newCurrentPage, pageLength));
    };

    const handleFollowUpModel = (data) => {
        setOpenFollowUp(true);
        // setOpenEditModel(false);
        // setOpenStatus(false);
        // setOpenSidebar(false);
        setOpenProjectStatus(false);
        setId(data._id);
        dispatch(GetFollowUpsDetailApi(data._id));
    };

    // const handleLeadStatusUpdateModel = (data) => {
    //     setOpenStatus(true);
    //     setOpenModelDetail(false);
    //     setOpenFollowUpsModel(false);
    //     setId(data._id);
    //     setLeadStatus(data?.leadStatusData?._id);
    // };

    const handleLeadStatusUpdateModel = (data, type) => {
        setLeadStatus(data?.leadStatusData?._id);
        setProjectStatusId(data?.projectionStatusData?._id);
        setOpenModelDetail(false);
        setOpenFollowUpsModel(false);
        setRescheduledFollowUps(false);
        setId(data._id);

        if (type === 2) {
            const updateValue = data?.leadStatusData?.status_name === 'Prospect';
            setOpenProjectStatus(updateValue);
            setOpenStatus(false);
        } else {
            setOpenProjectStatus(false);
            setOpenStatus(true);
        }
    };

    const handleActivityCloseModel = () => {
        setOpenStatus(false);
        setId('');
        dispatch(ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, newCurrentPage, pageLength));
    };

    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover key={key}>
                <TableCell sx={{ py: 1 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                    <MuiTypography
                        variant="h5"
                        sx={{
                            color: '#185b95',
                            '&:hover': {
                                color: '#0089ff',
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => onClickModel(row?._id)}
                    >
                        {row.client_name}
                    </MuiTypography>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                    <MuiTypography variant="h5">{row?.bdData?.name}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.lead_status ? (
                        <Chip
                            label={row?.leadStatusData?.status_name}
                            variant="outlined"
                            size="small"
                            sx={{
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                color: row?.leadStatusData?.status_color,
                                borderColor: row?.leadStatusData?.status_color
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row, 1)}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => handleLeadStatusUpdateModel(row, 1)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.projectionStatusData?.status_name ? (
                        <Chip
                            label={row?.projectionStatusData?.status_name}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => handleLeadStatusUpdateModel(row, 2)}
                            sx={{
                                cursor: row?.leadStatusData?.status_name === 'Prospect' ? 'pointer !important' : 'not-allowed !important',
                                fontSize: '0.875rem',
                                color: row?.projectionStatusData?.status_color,
                                borderColor: row?.projectionStatusData?.status_color
                            }}
                        />
                    ) : (
                        <Chip
                            size="small"
                            label="No Found"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleLeadStatusUpdateModel(row, 2)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.updateValue?.status_name ? (
                        <>
                            {compareDate ? (
                                <Chip
                                    label={row?.updateValue?.status_name}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        color: '#39A7FF',
                                        borderColor: '#39A7FF',
                                        fontSize: '0.875rem'
                                    }}
                                    onClick={() => onClickFollowUpsModel(row)}
                                />
                            ) : (
                                <Chip
                                    label={row?.updateValue?.status_name}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        color: 'red',
                                        borderColor: 'red',
                                        fontSize: '0.875rem'
                                    }}
                                    onClick={() => onClickFollowUpsModel(row)}
                                />
                            )}
                        </>
                    ) : (
                        <Chip
                            label="Done"
                            variant="outlined"
                            size="small"
                            // color="secondary"
                            sx={{
                                color: '#39A7FF',
                                borderColor: '#39A7FF',
                                cursor: 'not-allowed'
                            }}
                        />
                    )}
                    <br />
                    <MuiTooltip title="Follow-Ups Rescheduled" arrow>
                        <HistoryIcon
                            color="error"
                            onClick={() => onRescheduleFollowUpsModel(row)}
                            sx={{ cursor: 'pointer', color: 'error' }}
                        />
                    </MuiTooltip>
                </TableCell>
                <TableCell align="center" sx={{ py: 0 }}>
                    <MuiTooltip title="Follow-Ups Calls" arrow>
                        <CallIcon
                            onClick={() => handleFollowUpModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
                    </MuiTooltip>
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {moment(row?.resp?.updatedAt).format('DD-MMM-YYYY')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="Lead Information"
                                        content={false}
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Requirement Type</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Lead Source </TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Lead Type</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client LinkedIn</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Assigned Date</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        {row?.reqTypeData?.status_name ? row?.reqTypeData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadSourceData?.status_name ? row?.leadSourceData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadTypeData?.status_name ? row?.leadTypeData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.client_linkedin ? (
                                                            <a href={row?.client_linkedin} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{moment(row?.createdAt).format('DD-MMM-YYYY')}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Number</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client WhatsApp</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.client_name ? row?.client_name : '-'}</TableCell>
                                                    <TableCell>
                                                        {row?.client_email}
                                                        <CopyToClipboard
                                                            text={row?.client_email}
                                                            onCopy={() =>
                                                                dispatch(
                                                                    openSnackbar({
                                                                        open: true,
                                                                        message: 'Email Copied',
                                                                        variant: 'alert',
                                                                        alert: {
                                                                            color: 'success'
                                                                        },
                                                                        transition: 'Fade',
                                                                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            <ContentCopyTwoToneIcon
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    ml: 1,
                                                                    mt: 0.5,
                                                                    fontSize: '1rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </CopyToClipboard>
                                                    </TableCell>
                                                    <TableCell>{row?.client_number ? row?.client_number : '-'}</TableCell>
                                                    <TableCell>{row?.client_whatsapp_num ? row?.client_whatsapp_num : '-'}</TableCell>
                                                    <TableCell>{row?.client_country ? row?.client_country : '-'}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    {/* <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Add Notes</TableCell> */}
                                                    <TableCell style={{ fontWeight: 'bold' }}>Upwork URL</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Bid URL</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Proposal Amount</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Budget</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    {/* <TableCell sx={{ width: '320px' }}>
                                                        {row?.add_notes !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={20}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.add_notes}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell> */}
                                                    <TableCell>
                                                        {row?.upwork_job_url ? (
                                                            <a href={row?.upwork_job_url} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.bid_url ? (
                                                            <a href={row?.bid_url} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{row?.proposal_amount ? row?.proposal_amount : '-'}</TableCell>
                                                    <TableCell>{row?.client_budget ? row?.client_budget : '-'}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                                                        Address
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell colSpan={5}>{row?.address ? row?.address : '-'}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </SubCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
            {id && openModelDetail && (
                <LeadDetailModel
                    leadId={id}
                    open={openModelDetail}
                    close={() => {
                        setOpenModelDetail(false);
                        dispatch(ClearLeadDetailsData());
                    }}
                />
            )}
            {id && openFollowUp && <FollowUpsCalls leadId={id} open={openFollowUp} close={() => onCloseFollowUpsModel()} />}
            {id && rescheduledFollowUps && (
                <RescheduledFollowUps
                    activityId={activityId}
                    followUpsId={followUpsId}
                    open={rescheduledFollowUps}
                    close={() => onCloseFollowUpsModel()}
                />
            )}
            {id && openFollowUpsModel && (
                <UpdateFollowUpsModel
                    activityId={activityId}
                    followUpsId={followUpsId}
                    open={openFollowUpsModel}
                    close={() => onCloseFollowUpsModel()}
                />
            )}
            {id && openStatus && (
                <UpdateLeadStatus
                    projectStatusId={projectStatusId}
                    leadStatusId={leadStatusId}
                    open={openStatus}
                    leadId={id}
                    close={() => handleActivityCloseModel()}
                />
            )}
            {id && openProjectStatus && (
                <UpdateProjection
                    projectStatusId={projectStatusId}
                    open={openProjectStatus}
                    leadId={id}
                    close={() => handleActivityCloseModel()}
                />
            )}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

// ==============================|| DEFAULT FollowUpsList ||============================== //
const FollowUpsList = ({ startDate = '', endDate = '', bdeData = '', ClusterGetAllFollowUpsDataApi }) => {
    const theme = useTheme();
    const { getFollowUpsListData, getFollowUpsListLoading } = useSelector((state) => state.clusterLeadAction);
    // console.log('🚀 getFollowUpsListData:', getFollowUpsListData);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);

    useEffect(() => {
        if ((bdeData === '' && startDate === '') || endDate === '') {
            // ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, currentPage + 1, pageLength);
        } else {
            ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, 1, pageLength);
            setCurrentPage(0);
        }
        return () => setCurrentPage(0);
    }, [startDate, endDate, bdeData, pageLength]);

    // useEffect(() => {
    //     dispatch(LeadStatusGetApi());
    // }, []);

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, newPage + 1, pageLength));
    };

    const handleChangeRowsPerPage = async (event) => {
        await ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, currentPage + 1, event?.target.value);
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    return (
        <>
            <TableContainer sx={{ borderRadius: '10px', marginTop: '10px' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 1 }} />
                            <TableCell sx={{ py: 1 }}>Client Name</TableCell>
                            <TableCell sx={{ py: 1 }}>BDE Name</TableCell>
                            <TableCell sx={{ py: 1 }} align="left">
                                Lead Status
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="left">
                                Projection Status
                            </TableCell>
                            <TableCell sx={{ py: 1 }} align="left">
                                Task
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Follow Up Calls
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Last Update
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getFollowUpsListLoading && getFollowUpsListData?.docs?.length > 0 ? (
                            getFollowUpsListData?.docs?.map((list, i) => {
                                const compareDate =
                                    moment(list.updateFollowupDate).startOf('day').format('DD-MM-YYYY') ===
                                    moment(new Date()).startOf('day').format('DD-MM-YYYY');
                                return (
                                    <Row
                                        key={i}
                                        currentPage={currentPage}
                                        pageLength={pageLength}
                                        row={list}
                                        compareDate={compareDate}
                                        bdeData={bdeData}
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                );
                            })
                        ) : (
                            <>
                                {getFollowUpsListLoading === true ? (
                                    <ClusterFollowUpsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                            No Follow-Ups Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getFollowUpsListData.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default connect(null, { ClusterGetAllFollowUpsDataApi })(FollowUpsList);
