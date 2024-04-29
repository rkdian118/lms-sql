/* eslint-disable react/no-unescaped-entities */
// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { borderColor } from '@mui/system';
import { useSelector } from 'react-redux';
import { LeadDetailsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import ReactReadMoreReadLess from 'react-read-more-read-less';

// table data
function createData(name, calories) {
    return { name, calories };
}
// ==============================|| TABLE - DENSE ||============================== //

export default function LeadTable() {
    const { getLeadDetailsData, getLeadDetailsLoading } = useSelector((state) => state.clusterLeadAction);

    return (
        <TableContainer>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableBody>
                    {!getLeadDetailsLoading ? (
                        <>
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.reqTypeData?.status_name}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.leadSourceData?.status_name}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.leadTypeData?.status_name}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.leadStatusData?.status_name}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_name}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_number !== null ? getLeadDetailsData?.client_number : '-'}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_whatsapp_num !== null ? getLeadDetailsData?.client_whatsapp_num : '-'}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_email !== '' ? getLeadDetailsData?.client_email : '-'}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_country !== '' ? getLeadDetailsData?.client_country : '-'}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_linkedin ? (
                                        <a href={getLeadDetailsData?.client_linkedin} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadDetailsData?.client_whatsapp_num !== '' ? getLeadDetailsData?.client_linkedin : '-'} */}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.upwork_job_url ? (
                                        <a href={getLeadDetailsData?.upwork_job_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadDetailsData?.upwork_job_url !== '' ? getLeadDetailsData?.upwork_job_url : '-'} */}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.bid_url ? (
                                        <a href={getLeadDetailsData?.bid_url} target="_blank" rel="noreferrer">
                                            Click Here
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                    {/* {getLeadDetailsData?.bid_url !== '' ? getLeadDetailsData?.bid_url : '-'} */}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.proposal_amount}
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
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {getLeadDetailsData?.client_budget}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell
                                    sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                    component="th"
                                    scope="row"
                                >
                                    Note
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {/* {getLeadDetailsData?.add_notes !== '' ? getLeadDetailsData?.add_notes : '-'} */}
                                    {getLeadDetailsData?.add_notes ? (
                                        <ReactReadMoreReadLess
                                            charLimit={50}
                                            sx={{ color: 'red' }}
                                            readMoreText="Read more ▼"
                                            readLessText="Read less ▲"
                                        >
                                            {getLeadDetailsData?.add_notes}
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
                                    Address
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: '250px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                >
                                    {/* {getLeadDetailsData?.add_notes !== '' ? getLeadDetailsData?.add_notes : '-'} */}
                                    {getLeadDetailsData?.address ? (
                                        <ReactReadMoreReadLess
                                            charLimit={50}
                                            sx={{ color: 'red' }}
                                            readMoreText="Read more ▼"
                                            readLessText="Read less ▲"
                                        >
                                            {getLeadDetailsData?.address}
                                        </ReactReadMoreReadLess>
                                    ) : (
                                        '-'
                                    )}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : (
                        <LeadDetailsTableLoader rows={10} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
