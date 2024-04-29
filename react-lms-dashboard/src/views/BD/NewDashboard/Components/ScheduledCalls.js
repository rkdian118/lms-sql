/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import {
    Box,
    Chip,
    TableRow,
    IconButton,
    TableCell,
    Collapse,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TablePagination
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
// import { Link } from 'react-router-dom';
// project imports
import { useTheme } from '@mui/material/styles';

// assets
import MuiTypography from '@mui/material/Typography';
// import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
// import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
// import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
// import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
// import MainCard from 'ui-component/cards/MainCard';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import CallDetailsModel from './Models/CallDetailsModel';
import { connect, useSelector } from 'react-redux';
import { DashboardTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { ClearLeadCallDetailsData, GetAllCallsDataApi } from 'store/slices/businessAction';
import moment from 'moment';
import { dispatch } from 'store';
// import { getCallStatusColor, getLeadStatusColor } from 'Helper/StatusColor';
import CallStatusModel from './Models/CallStatusModel';
import { CallStatusGetApi } from 'store/slices/masterAction';
// import EditIcon from '@mui/icons-material/Edit';
// import MuiTooltip from '@mui/material/Tooltip';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { openSnackbar } from 'store/slices/snackbar';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Row({ row, key, currentPage, pageLength, startDate, endDate }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    // const [openEditModel, setOpenEditModel] = React.useState(false);
    // const [openSidebar, setOpenSidebar] = React.useState(false);

    // const [isLoading, setLoading] = useState(true);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [openCallStatusModel, setOpenCallStatusModel] = useState(false);
    const [activityId, setActivityId] = useState('');
    const [callStatusId, setCallStatusId] = useState('');
    // console.log('🚀  getCallsListData:', Object.keys(getCallsListData).length > 0);

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
        dispatch(GetAllCallsDataApi(startDate, endDate, newCurrentPage, pageLength));
    };

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
                                // color: '#1e88e5',
                                color: '#0089ff',
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => onClickModel(row?._id)}
                    >{`${row.client_name}`}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.leadStatusData?.status_name ? (
                        <Chip
                            label={row?.leadStatusData?.status_name}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            sx={{
                                color: row?.leadStatusData?.status_color,
                                borderColor: row?.leadStatusData?.status_color,
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
                                fontSize: '0.875rem'
                            }}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {row?.callData?.call_status ? (
                        <Chip
                            label={row?.callData?.call_status}
                            size="small"
                            variant="outlined"
                            sx={{
                                color: row?.callData?.status_color,
                                borderColor: row?.callData?.status_color,
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
                {/* <TableCell align="left" sx={{ py: 1 }}></TableCell> */}
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
    row: PropTypes.object,
    key: PropTypes.number,
    currentPage: PropTypes.string,
    pageLength: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
};

// ==============================|| DEFAULT ScheduledCalls ||============================== //
const ScheduledCalls = ({ GetAllCallsDataApi, startDate = '', endDate = '' }) => {
    // const theme = useTheme();
    const { getCallsListData, getCallsListLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀  getCallsListData:', Object.keys(getCallsListData).length > 0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);

    // useEffect(() => {
    //     GetAllCallsDataApi(startDate, endDate, currentPage + 1, pageLength);
    // }, [startDate, endDate, pageLength]);

    useEffect(() => {
        if (startDate === '' && endDate === '') {
            // GetAllCallsDataApi(startDate, endDate, currentPage + 1, pageLength);
        } else {
            GetAllCallsDataApi(startDate, endDate, 1, pageLength);
            setCurrentPage(0);
        }
        return () => setCurrentPage(0);
    }, [startDate, endDate, pageLength]);

    // useEffect(() => {
    //     CallStatusGetApi();
    // }, []);

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllCallsDataApi(startDate, endDate, newPage + 1, pageLength));
    };

    const handleChangeRowsPerPage = async (event) => {
        await GetAllCallsDataApi(startDate, endDate, currentPage + 1, event?.target.value);
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    // const mappedData = Object.keys(getCallsListData?.docs).map((followUpKey) => (
    //     <>
    //         {getCallsListData?.docs[followUpKey].map((list, i) => (
    //             <Row key={i} row={list} currentPage={currentPage} pageLength={pageLength} startDate={startDate} endDate={endDate} />
    //         ))}
    //     </>
    // ));

    return (
        <>
            <TableContainer sx={{ borderRadius: '10px', marginTop: '10px' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 1 }} />
                            <TableCell sx={{ py: 1 }}>Client Name</TableCell>
                            <TableCell sx={{ py: 1 }} align="left">
                                Lead Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Call Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Meeting Time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {getCallsListLoading ? (
                            <DashboardTableLoader rows={20} />
                        ) : (
                            <>
                                {Object.keys(getCallsListData?.docs).length > 0 ? (
                                    <>{mappedData}</>
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={5}>
                                            No Calls Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )} */}
                        {!getCallsListLoading && getCallsListData?.docs?.length > 0 ? (
                            getCallsListData?.docs?.map((list, i) => (
                                <Row
                                    key={i}
                                    row={list}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))
                        ) : (
                            <>
                                {getCallsListLoading === true ? (
                                    <DashboardTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={5}>
                                            No Calls Found
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
                count={getCallsListData.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

ScheduledCalls.propTypes = {
    GetAllCallsDataApi: PropTypes.object,
    // CallStatusGetApi: PropTypes.object,
    startDate: PropTypes.string,
    endDate: PropTypes.string
};

export default connect(null, { GetAllCallsDataApi, CallStatusGetApi })(ScheduledCalls);
