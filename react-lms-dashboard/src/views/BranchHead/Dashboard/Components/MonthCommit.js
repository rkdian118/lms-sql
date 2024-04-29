import PropTypes from 'prop-types';

// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// table data
const createData = (yesterday, mtd, colorClass = '') => ({ yesterday, mtd, colorClass });

const rows = [
    createData('28,000', '100.23'),
    createData('28,000', '100.85'),
    createData('28,000', '100.45'),
    createData('28,000', '100.45'),
    createData('28,000', '100.45'),
    createData('28,000', '100.45'),
    createData('28,000', '100.23'),
    createData('28,000', '100.23'),
    createData('28,000', '100.23')
];

// ===========================|| DATA WIDGET - PRODUCT SALES CARD ||=========================== //

const MonthCommit = ({ title }) => (
    <MainCard title={title} content={false} sx={{ '& .MuiCardHeader-root': { padding: '12px 24px' } }}>
        <PerfectScrollbar style={{ height: 345, padding: 0 }}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>(USD)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.yesterday}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PerfectScrollbar>
    </MainCard>
);

MonthCommit.propTypes = {
    title: PropTypes.string
};

export default MonthCommit;
