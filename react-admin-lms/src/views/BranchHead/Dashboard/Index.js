import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TeamLeaderList from './Components/TeamLeaderList';
import ReportSection from './Components/ReportSection';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
                <TeamLeaderList />
            </Grid>
            <Grid item xs={6} md={6}>
                <ReportSection />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
