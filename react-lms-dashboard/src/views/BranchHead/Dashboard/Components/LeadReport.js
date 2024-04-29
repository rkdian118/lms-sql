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
    createData('0', '$ 100.23'),
    createData('0', '$ 100.85'),
    createData('0', '$ 100.45'),
    createData('0', '$ 100.45'),
    createData('0', '$ 100.45'),
    createData('0', '$ 100.45'),
    createData('0', '$ 100.23'),
    createData('0', '$ 100.23')
];

// ===========================|| DATA WIDGET - PRODUCT SALES CARD ||=========================== //

const LeadReport = ({ title }) => (
    <MainCard title={title} content={false} sx={{ '& .MuiCardHeader-root': { padding: '12px 24px' } }}>
        {/* <Grid sx={{ px: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            Earning
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            20,569$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            Yesterday
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            580$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            This Week
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            5,789$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid> */}
        <PerfectScrollbar style={{ height: 345, padding: 0 }}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                Internal Leads(No)
                            </TableCell>
                            <TableCell align="center" colSpan={2}>
                                External Leads(No)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>Yesterday</TableCell>
                            <TableCell>MTD</TableCell>
                            <TableCell>Yesterday</TableCell>
                            <TableCell>MTD</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.yesterday}</TableCell>
                                <TableCell>{row.mtd}</TableCell>
                                <TableCell>{row.yesterday}</TableCell>
                                <TableCell>{row.mtd}</TableCell>
                                {/* <TableCell sx={{ pr: 3 }}>
                                    <span>{row.yesterday}</span>
                                </TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    <span>{row.mtd}</span>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PerfectScrollbar>
    </MainCard>
);

LeadReport.propTypes = {
    title: PropTypes.string
};

export default LeadReport;
