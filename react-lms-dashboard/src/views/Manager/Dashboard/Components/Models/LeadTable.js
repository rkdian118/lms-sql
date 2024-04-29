// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { borderColor } from '@mui/system';

// table data
function createData(name, calories) {
    return { name, calories };
}

const rows = [
    createData('Lead Source', 'Internal'),
    createData('Lead Type', 'Email'),
    createData('Client Name', 'XXXXXXXXXX'),
    createData("Client's Email Address", 'XXXXXXXXXX'),
    createData("Client's Country", 'XXXXXXXXXX'),
    createData("Client's Skype ID", 'XXXXXXXXXX'),
    createData("Client's Contact Number", 'XXXXXXXXXX'),
    createData("Client's WhatsApp Number", 'XXXXXXXXXX'),
    createData("Client's LinkedIn URL", 'XXXXXXXXXX'),
    createData('Upwork Job URL', 'XXXXXXXXXX'),
    createData("Client's Requirement", 'XXXXXXXXXX'),
    createData("Client's Lead Status", 'XXXXXXXXXX'),
    createData('Follow-up Status', 'XXXXXXXXXX'),
    createData('View Remarks', 'XXXXXXXXXX'),
    createData('Current Call Status', 'XXXXXXXXXX'),
    createData('View RFP Status', 'XXXXXXXXXX')
];
// ==============================|| TABLE - DENSE ||============================== //

export default function LeadTable() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow hover key={row.name}>
                            <TableCell
                                sx={{ pl: 3, py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                                component="th"
                                scope="row"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ width: '150px', py: '3px', color: '#000000', borderColor: '#0000005c', fontWeight: '500' }}
                            >
                                {row.calories}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
