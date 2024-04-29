import { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import GraphSection from './Components/GraphSection';
import PieChart from './Components/Chart/PieChart';
import BranchesReport from './Components/BranchesReport';
import NewMainCard from 'ui-component/cards/NewMainCard';
import { Box } from '@mui/system';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.up('lg'));
    console.log('🚀 matchDownMd:', matchDownMd);
    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('January');

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <GraphSection />
            </Grid>
            <Grid item xs={12} md={9}>
                <NewMainCard
                    sx={{
                        backgroundColor: '#fdf6e9',
                        '& .MuiCardHeader-root': { padding: '12px 24px' },
                        '& .MuiCardContent-root': { padding: '0' }
                    }}
                    title={
                        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                            <Grid item>
                                <Typography variant="h3" sx={{ color: '#3e7dc3' }}>
                                    Leads Report Dashboard
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Select value={selectedMonth} onChange={handleMonthChange} variant="outlined" size="small">
                                    <MenuItem value="January">January</MenuItem>
                                    <MenuItem value="February">February</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    }
                >
                    <PerfectScrollbar
                        component="div"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#ff0000 #f1f1f1'
                        }}
                    >
                        <Box sx={{ p: 2.25 }}>
                            <Grid container sx={{ height: '540px', '&.MuiGrid-root': { p: '0px' } }}>
                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                                    <BranchesReport allColor="#ec8786" allBorderColor="#e96b6a" branchName="NOIDA" />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                                    <BranchesReport allColor="#60b253" allBorderColor="#4c9d3f" branchName="INODRE, APP" />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                                    <BranchesReport allColor="#d79363" allBorderColor="#cd8755" branchName="INODRE, Technologies" />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                                    <BranchesReport allColor="#b27cb4" allBorderColor="#c486c7" branchName="BENGALURU" />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { py: '15px' } }}>
                                    <BranchesReport allColor="#55b08c" allBorderColor="#5dc098" branchName="CHANDIGARH" />
                                </Grid>
                            </Grid>
                        </Box>
                    </PerfectScrollbar>
                </NewMainCard>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
