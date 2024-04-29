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

export default function LeadCallTable() {
    const { getLeadCallDetailsData, getLeadCallDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    // console.log('🚀  getLeadCallDetailsData:', getLeadCallDetailsData);

    return (
        <TableContainer>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableBody>
                    {!getLeadCallDetailsLoading ? (
                        <>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Call Type
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData?.call_type}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Call Mode
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData?.call_mode}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Call Status
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData?.call_status}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Comment Remark
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {/* {getLeadCallDetailsData?.callData?.comment_remark} */}
                                    {getLeadCallDetailsData?.callData?.comment_remark ? (
                                        <ReactReadMoreReadLess
                                            charLimit={50}
                                            sx={{ color: 'red' }}
                                            readMoreText="Read more ▼"
                                            readLessText="Read less ▲"
                                        >
                                            {getLeadCallDetailsData?.callData?.comment_remark}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData
                                        ? moment(getLeadCallDetailsData?.callData?.meeting_date_time).format('DD MMM hh:mm a')
                                        : '-'}
                                    {/* {getLeadCallDetailsData?.callData?.meeting_date_time} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Recording Link
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData ? (
                                        <a href={getLeadCallDetailsData?.callData?.recording_link} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadCallDetailsData?.callData?.meeting_date_time} */}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Meeting Link
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {/* {getLeadCallDetailsData?.callData?.meeting_link} */}
                                    {getLeadCallDetailsData?.callData?.meeting_link ? (
                                        <a href={getLeadCallDetailsData?.callData?.meeting_link} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
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
                                    Assigned Date
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.callData
                                        ? moment(getLeadCallDetailsData?.callData?.createdAt).format('DD MMM hh:mm a')
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.reqType}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.leadSource}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.leadType}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.leadStatus}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_name}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_number !== null ? getLeadCallDetailsData?.client_number : '-'}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_whatsapp_num !== null
                                        ? getLeadCallDetailsData?.client_whatsapp_num
                                        : '-'}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_email !== '' ? getLeadCallDetailsData?.client_email : '-'}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_country !== '' ? getLeadCallDetailsData?.client_country : '-'}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_linkedin ? (
                                        <a href={getLeadCallDetailsData?.client_linkedin} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadCallDetailsData?.client_whatsapp_num !== '' ? getLeadCallDetailsData?.client_linkedin : '-'} */}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.upwork_job_url ? (
                                        <a href={getLeadCallDetailsData?.upwork_job_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadCallDetailsData?.upwork_job_url !== '' ? getLeadCallDetailsData?.upwork_job_url : '-'} */}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.bid_url ? (
                                        <a href={getLeadCallDetailsData?.bid_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadCallDetailsData?.bid_url !== '' ? getLeadCallDetailsData?.bid_url : '-'} */}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.proposal_amount}
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
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.client_budget}
                                </TableCell>
                            </TableRow>
                            {/* <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Note
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '350px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadCallDetailsData?.add_notes !== '' ? getLeadCallDetailsData?.add_notes : '-'}
                                </TableCell>
                            </TableRow> */}
                        </>
                    ) : (
                        <LeadDetailsTableLoader rows={15} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
