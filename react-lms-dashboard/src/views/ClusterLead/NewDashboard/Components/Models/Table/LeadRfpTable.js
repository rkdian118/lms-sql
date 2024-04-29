/* eslint-disable react/no-unescaped-entities */
// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { borderColor } from '@mui/system';
import { useSelector } from 'react-redux';
import { LeadDetailsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import moment from 'moment';
import ReactReadMoreReadLess from 'react-read-more-read-less';

// table data
function createData(name, calories) {
    return { name, calories };
}
// ==============================|| TABLE - DENSE ||============================== //

export default function LeadRfpTable() {
    const { getRfpDetailsData, getRfpDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    // console.log('🚀  getRfpDetailsData:', getRfpDetailsData);

    return (
        <TableContainer>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableBody>
                    {!getRfpDetailsLoading ? (
                        <>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    RFP Type
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.rfpData?.rfp_type}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    RFP Activity
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.rfpData?.activity}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    RFP Status
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.rfpData?.lead_rfp_status}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Minutes Of Meeting
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {/* {getRfpDetailsData?.rfpData?.minutes_of_meeting} */}
                                    {getRfpDetailsData?.rfpData?.minutes_of_meeting ? (
                                        <ReactReadMoreReadLess
                                            charLimit={50}
                                            sx={{ color: 'red' }}
                                            readMoreText="Read more ▼"
                                            readLessText="Read less ▲"
                                        >
                                            {getRfpDetailsData?.rfpData?.minutes_of_meeting}
                                        </ReactReadMoreReadLess>
                                    ) : (
                                        '-'
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Meeting Date & Time
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.rfpData
                                        ? moment(getRfpDetailsData?.rfpData?.meeting_date_time).format('DD MMM hh:mm a')
                                        : '-'}
                                    {/* {getRfpDetailsData?.rfpData?.meeting_date_time} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Assigned Date
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.rfpData
                                        ? moment(getRfpDetailsData?.rfpData?.createdAt).format('DD MMM hh:mm a')
                                        : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Requirement Type
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.reqType}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Lead Source
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.leadSource}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Lead Type
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.leadType}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Lead Status
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.leadStatus}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_name}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client's Contact Number
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_number !== null ? getRfpDetailsData?.client_number : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client's WhatsApp Number
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_whatsapp_num !== null ? getRfpDetailsData?.client_whatsapp_num : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client's Email Address
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_email !== '' ? getRfpDetailsData?.client_email : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client's Country
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_country !== '' ? getRfpDetailsData?.client_country : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client's LinkedIn URL
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_linkedin ? (
                                        <a href={getRfpDetailsData?.client_linkedin} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getRfpDetailsData?.client_whatsapp_num !== '' ? getRfpDetailsData?.client_linkedin : '-'} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Upwork Job URL
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.upwork_job_url ? (
                                        <a href={getRfpDetailsData?.upwork_job_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getRfpDetailsData?.upwork_job_url !== '' ? getRfpDetailsData?.upwork_job_url : '-'} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Bid URL
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.bid_url ? (
                                        <a href={getRfpDetailsData?.bid_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getRfpDetailsData?.bid_url !== '' ? getRfpDetailsData?.bid_url : '-'} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Proposal Amount
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.proposal_amount}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Client Budget
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '550px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getRfpDetailsData?.client_budget}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : (
                        <LeadDetailsTableLoader rows={15} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
