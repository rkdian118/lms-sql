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
    TableHead
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
import { ClearLeadDetailsData, ClusterGetAllFollowUpsDataApi } from 'store/slices/clusterLeadAction';
import { getLeadStatusColor } from 'Helper/StatusColor';
import UpdateFollowUpsModel from './Models/UpdateFollowUpsModel';
import UpdateLeadStatus from './Models/UpdateLeadStatus';
import { LeadStatusGetApi } from 'store/slices/masterAction';
// import LeadDetailModel from './Models/LeadDetailModel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';

function Row({ row, key, compareDate, startDate, endDate }) {
    const theme = useTheme();
    // const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openFollowUpsModel, setOpenFollowUpsModel] = useState(false);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [activityId, setActivityId] = useState('');
    const [followUpsId, setFollowUpsId] = useState('');
    const [openStatus, setOpenStatus] = useState(false);
    const [leadStatusId, setLeadStatus] = React.useState('');

    const onClickModel = (data) => {
        setOpenModelDetail(true);
        setOpenFollowUpsModel(false);
        setOpenStatus(false);
        setId(data);
    };

    const onClickFollowUpsModel = (data) => {
        setOpenFollowUpsModel(true);
        setOpenModelDetail(false);
        setOpenStatus(false);
        setActivityId(data?.resp?._id);
        setFollowUpsId(data?.updateValue?._id);
        setId(data._id);
    };

    const onCloseFollowUpsModel = () => {
        setId('');
        setOpenFollowUpsModel(false);
        dispatch(ClusterGetAllFollowUpsDataApi(startDate, endDate));
    };

    const handleLeadStatusUpdateModel = (data) => {
        setOpenStatus(true);
        setOpenModelDetail(false);
        setOpenFollowUpsModel(false);
        setId(data._id);
        setLeadStatus(data?.leadStatusData?._id);
    };

    const handleActivityCloseModel = () => {
        setOpenStatus(false);
        setId('');
        dispatch(ClusterGetAllFollowUpsDataApi(startDate, endDate));
    };

    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={key}>
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
                </TableCell>{' '}
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                    <MuiTypography variant="h5">{row?.bdData?.name}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.lead_status ? (
                        <Chip
                            label={row?.lead_status}
                            variant="outlined"
                            size="small"
                            sx={{
                                color: getLeadStatusColor(row?.lead_status),
                                borderColor: getLeadStatusColor(row?.lead_status),
                                fontSize: '0.875rem'
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row)}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            sx={{
                                color: getLeadStatusColor(row?.lead_status),
                                borderColor: getLeadStatusColor(row?.lead_status),
                                fontSize: '0.875rem'
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row)}
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Created At</TableCell>
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
                                                    <TableCell>{row?.client_email ? row?.client_email : '-'}</TableCell>
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
            {id && openFollowUpsModel && (
                <UpdateFollowUpsModel
                    activityId={activityId}
                    followUpsId={followUpsId}
                    open={openFollowUpsModel}
                    close={() => onCloseFollowUpsModel()}
                />
            )}
            {id && openStatus && (
                <UpdateLeadStatus leadStatusId={leadStatusId} open={openStatus} leadId={id} close={() => handleActivityCloseModel()} />
            )}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

// ==============================|| DEFAULT FollowUpsList ||============================== //
const FollowUpsList = ({ startDate = '', endDate = '' }) => {
    const theme = useTheme();
    const { getFollowUpsListData, getFollowUpsListLoading } = useSelector((state) => state.clusterLeadAction);

    useEffect(() => {
        dispatch(LeadStatusGetApi());
    }, []);

    const mappedData = Object.keys(getFollowUpsListData).map((followUpKey) => (
        <>
            {getFollowUpsListData[followUpKey].map((list, i) => {
                const compareDate = moment(list.updateFollowupDate).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY');
                return (
                    <>
                        {followUpKey !== '8th follow up' ? (
                            <Row key={i} row={list} compareDate={compareDate} startDate={startDate} endDate={endDate} />
                        ) : (
                            ''
                        )}
                    </>
                );
            })}
        </>
    ));

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
                                Task
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Last Update
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFollowUpsListLoading ? (
                            <ClusterFollowUpsTableLoader rows={10} />
                        ) : (
                            <>
                                {Object.keys(getFollowUpsListData).length > 0 ? (
                                    <>{mappedData}</>
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={6}>
                                            No Follow-Ups Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default connect(null, { ClusterGetAllFollowUpsDataApi })(FollowUpsList);
