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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
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
import CallDetailsModel from './Models/CallDetailsModel';
import { connect, useSelector } from 'react-redux';
import { ClusterFollowUpsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { ClearLeadCallDetailsData, ClusterGetAllCallsDataApi } from 'store/slices/clusterLeadAction';
import moment from 'moment';
import { dispatch } from 'store';
import { getCallStatusColor, getLeadStatusColor } from 'Helper/StatusColor';
import CallStatusModel from './Models/CallStatusModel';
import { CallStatusGetApi } from 'store/slices/masterAction';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';

function Row({ row, key, startDate, endDate }) {
    const theme = useTheme();
    // const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);

    const [isLoading, setLoading] = useState(true);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [openCallStatusModel, setOpenCallStatusModel] = useState(false);
    const [activityId, setActivityId] = useState('');
    const [callStatusId, setCallStatusId] = useState('');

    const onClickModel = (data) => {
        setOpenModelDetail(true);
        setId(data);
    };

    const onClickCallStatusModel = (data) => {
        setOpenCallStatusModel(true);
        setOpenModelDetail(false);
        setActivityId(data?.callData?.callResp?._id);
        setCallStatusId(data?.resp?.activity_id);
        setId(data._id);
    };

    const onCloseCallStatusModel = () => {
        setId('');
        setCallStatusId('');
        setOpenCallStatusModel(false);
        dispatch(ClusterGetAllCallsDataApi(startDate, endDate));
    };

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
                                // color: '#1e88e5',
                                color: '#0089ff',
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => onClickModel(row?._id)}
                    >{`${row.client_name}`}</MuiTypography>
                </TableCell>{' '}
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                    <MuiTypography variant="h5">{row?.bdData?.name}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.lead_status ? (
                        <Chip
                            label={row?.lead_status}
                            variant="outlined"
                            // color="success"
                            size="small"
                            sx={{
                                color: getLeadStatusColor(row?.lead_status),
                                borderColor: getLeadStatusColor(row?.lead_status),
                                fontSize: '0.875rem'
                                // cursor: 'pointer'
                            }}
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
                                // cursor: 'pointer'
                            }}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.resp?.status_name ? (
                        <Chip
                            label={row?.resp?.status_name}
                            size="small"
                            variant="outlined"
                            sx={{
                                color: getCallStatusColor(row?.resp?.status_name),
                                borderColor: getCallStatusColor(row?.resp?.status_name),
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                            onClick={() => onClickCallStatusModel(row)}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            size="small"
                            variant="outlined"
                            color="secondary"
                            sx={{
                                fontSize: '0.875rem'
                            }}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {moment(row?.callData?.meeting_date_time).format('DD-MMM HH:mm')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="Call Information"
                                        content={false}
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Call Status</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Meeting Date & Time</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Meeting Link</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Recording Link</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.callData?.call_status}</TableCell>
                                                    <TableCell>
                                                        {moment(row?.callData?.meeting_date_time).format('DD-MMM-YYYY HH:mm:ss')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.callData?.meeting_link ? (
                                                            <a href={row?.callData?.meeting_link} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.recording_link ? (
                                                            <a href={row?.recording_link} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.client_name ? row?.client_name : '-'}</TableCell>
                                                    <TableCell>{row?.client_email ? row?.client_email : '-'}</TableCell>
                                                    <TableCell>{row?.pe_name ? row?.pe_name : '-'}</TableCell>
                                                    <TableCell style={{ width: '210px' }}>
                                                        {row?.client_country ? row?.client_country : '-'}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    {/* <TableCell style={{ fontWeight: 'bold', width: '210px' }}>Country</TableCell> */}
                                                    <TableCell colSpan={6} style={{ fontWeight: 'bold', width: '220px' }}>
                                                        Comment
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    {/* <TableCell style={{ width: '210px' }}>
                                                        {row?.leadData?.client_country ? row?.leadData?.client_country : '-'}
                                                    </TableCell> */}
                                                    <TableCell colSpan={6} style={{ width: '220px' }}>
                                                        {row?.comment_remark ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={50}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.comment_remark}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                {/* {row.history?.map((historyRow) => (
                                                    <TableRow hover key={historyRow.date}>
                                                        <TableCell component="th" scope="row">
                                                            {historyRow.date}
                                                        </TableCell>
                                                        <TableCell>{historyRow.customerId}</TableCell>
                                                        <TableCell align="right">{historyRow.amount}</TableCell>
                                                        <TableCell align="right">
                                                            {Math.round(historyRow.amount * row.price * 100) / 100}
                                                        </TableCell>
                                                    </TableRow>
                                                ))} */}
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
                <CallDetailsModel
                    leadId={id}
                    open={openModelDetail}
                    close={() => {
                        setOpenModelDetail(false);
                        dispatch(ClearLeadCallDetailsData());
                    }}
                />
            )}
            {id && openCallStatusModel && (
                <CallStatusModel
                    callStatusId={callStatusId}
                    activityId={activityId}
                    open={openCallStatusModel}
                    close={() => onCloseCallStatusModel()}
                />
            )}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

// ==============================|| DEFAULT ScheduledCalls ||============================== //
const ScheduledCalls = ({ ClusterGetAllCallsDataApi, CallStatusGetApi, startDate = '', endDate = '' }) => {
    const theme = useTheme();
    const { getCallsListData, getCallsListLoading } = useSelector((state) => state.clusterLeadAction);

    useEffect(() => {
        CallStatusGetApi();
    }, []);

    const mappedData = Object.keys(getCallsListData).map((followUpKey) => (
        <>
            {getCallsListData[followUpKey].map((list, i) => (
                <Row key={i} row={list} startDate={startDate} endDate={endDate} />
            ))}
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
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Call Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Meeting Time
                            </TableCell>
                            {/* <TableCell sx={{ py: 1 }} align="left">
                                Country
                            </TableCell>
                            <TableCell sx={{ py: 1, width: '170px' }} align="left">
                                Activity
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getCallsListLoading ? (
                            <ClusterFollowUpsTableLoader rows={20} />
                        ) : (
                            <>
                                {Object.keys(getCallsListData).length > 0 ? (
                                    <>{mappedData}</>
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={6}>
                                            No Calls Found
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

export default connect(null, { ClusterGetAllCallsDataApi, CallStatusGetApi })(ScheduledCalls);
