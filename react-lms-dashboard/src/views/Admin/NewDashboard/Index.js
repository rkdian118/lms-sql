import { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';

import NewMainCard from 'ui-component/cards/NewMainCard';
import { Box, Stack } from '@mui/system';
import UnderConstruction from 'views/pages/maintenance/UnderConstruction';
import LeadCards from './LeadCards';
import LeadSummary from './LeadSummary';
import UpcomingTask from './UpcomingTask';
import LeadSource from './LeadSource';
import SalesPerformance from './SalesPerformance';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.up('lg'));
    // console.log('🚀 matchDownMd:', matchDownMd);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={2}>
            {/* <Grid item xs={12} md={12}>
                <UnderConstruction />
            </Grid> */}
            <Grid item xs={12}>
                <LeadSummary isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
                <LeadCards isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack spacing={gridSpacing}>
                    <LeadSource />
                    <UpcomingTask />
                </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
                <SalesPerformance isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
