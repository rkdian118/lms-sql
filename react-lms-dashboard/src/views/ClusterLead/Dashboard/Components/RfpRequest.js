/* eslint-disable radix */
import { useEffect, useState } from 'react';
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
import { ClusterDashboardTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { ClearLeadRfpDetailsData, ClusterGetAllRfpDataApi } from 'store/slices/clusterLeadAction';
import moment from 'moment';
import RfpDetailSModels from './Models/RfpDetailSModels';
import { dispatch } from 'store';
import { getLeadStatusColor, getRFPStatusColor } from 'Helper/StatusColor';
import RfpMainStatus from 'views/BD/RFP/RfpMainStatus';
import { RfpStatusGetApi } from 'store/slices/masterAction';
// import LeadDetailModel from './Models/LeadDetailModel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { openSnackbar } from 'store/slices/snackbar';

function Row({ row, key, currentPage, pageLength, startDate, endDate }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = useState('');
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const { getRfpListData, getRfpListLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀getRfpListData:', getRfpListData, Object.keys(getRfpListData).length);
    const [openStatus, setOpenStatus] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // setLoading(false);
        dispatch(RfpStatusGetApi());
    }, []);

    const onClickModel = (data) => {
        setOpenModelDetail(true);
        setId(data);
    };

    const handleRfpStatusUpdateModel = (data) => {
        setOpenStatus(true);
        setId(data?.rfpData?._id);
    };

    const handleCloseModel = () => {
        setOpenStatus(false);
        setId('');
        dispatch(ClusterGetAllRfpDataApi(startDate, endDate, newCurrentPage, pageLength));
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
                                color: getRFPStatusColor(row?.resp?.status_name),
                                borderColor: getRFPStatusColor(row?.resp?.status_name),
                                // cursor: 'pointer',
                                // cursor: 'not-allowed',
                                fontSize: '0.875rem'
                            }}
                            // onClick={() => handleRfpStatusUpdateModel(row)}
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
                            // onClick={() => handleRfpStatusUpdateModel(row)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    {moment(row?.resp?.updatedAt).format('DD-MMM-YYYY')}
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Status</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Activity</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Last Update</TableCell>
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
                                                    <TableCell>{row?.rfpData?.lead_rfp_status}</TableCell>
                                                    <TableCell>{row?.resp?.status_name}</TableCell>
                                                    <TableCell>{moment(row?.resp?.updatedAt).format('DD-MMM-YYYY')}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Proposal Value</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Minutes Of Meeting</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Comment Remarks</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.rfpData?.rfp?.pe_name ? row?.rfpData?.rfp?.pe_name : '-'}</TableCell>
                                                    <TableCell>{row?.rfpData?.rfp?.pe_email ? row?.rfpData?.rfp?.pe_email : '-'}</TableCell>
                                                    <TableCell>{row?.rfpData?.proposal_value}</TableCell>
                                                    <TableCell sx={{ width: '320px' }}>
                                                        {row?.rfpData?.rfp?.minutes_of_meeting &&
                                                        row?.rfpData?.rfp?.minutes_of_meeting !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={15}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.rfpData?.rfp?.minutes_of_meeting}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={{ width: '320px' }}>
                                                        {row?.rfpData?.rfp?.remarks && row?.rfpData?.rfp?.remarks !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={15}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.rfpData?.rfp?.remarks}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
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
            {id && openStatus && <RfpMainStatus open={openStatus} rfpId={id} close={() => handleCloseModel()} />}
            {openModelDetail && (
                <RfpDetailSModels
                    leadId={id}
                    open={openModelDetail}
                    close={() => {
                        setOpenModelDetail(false);
                        dispatch(ClearLeadRfpDetailsData());
                    }}
                />
            )}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

// ==============================|| DEFAULT RfpRequest ||============================== //
const RfpRequest = ({ ClusterGetAllRfpDataApi, startDate = '', endDate = '', bdeData = '' }) => {
    const theme = useTheme();
    const { getRfpListData, getRfpListLoading } = useSelector((state) => state.clusterLeadAction);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);

    // useEffect(() => {
    //     ClusterGetAllRfpDataApi(startDate, endDate, bdeData, currentPage + 1, pageLength);
    // }, [startDate, endDate, bdeData, pageLength]);

    useEffect(() => {
        if (bdeData === '' || startDate === '' || endDate === '') {
            ClusterGetAllRfpDataApi(startDate, endDate, bdeData, currentPage + 1, pageLength);
        } else {
            ClusterGetAllRfpDataApi(startDate, endDate, bdeData, 1, pageLength);
            setCurrentPage(0);
        }
        return () => setCurrentPage(0);
    }, [startDate, endDate, bdeData, pageLength]);

    useEffect(() => {
        dispatch(RfpStatusGetApi());
    }, []);

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterGetAllRfpDataApi(startDate, endDate, bdeData, newPage + 1, pageLength));
    };

    const handleChangeRowsPerPage = async (event) => {
        await ClusterGetAllRfpDataApi(startDate, endDate, bdeData, currentPage + 1, event?.target.value);
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    // const mappedData = Object.keys(getRfpListData?.docs).map((followUpKey) => (
    //     <>
    //         {getRfpListData?.docs[followUpKey].map((list, i) => (
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
                            <TableCell sx={{ py: 1 }}>BDE Name</TableCell>
                            <TableCell sx={{ py: 1 }} align="left">
                                Lead Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                RFP Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 1 }} align="left">
                                Last Update
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
                        {!getRfpListLoading && getRfpListData?.docs?.length > 0 ? (
                            getRfpListData?.docs?.map((list, i) => (
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
                                {getRfpListLoading === true ? (
                                    <ClusterDashboardTableLoader rows={10} />
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getRfpListData.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default connect(null, { ClusterGetAllRfpDataApi })(RfpRequest);
