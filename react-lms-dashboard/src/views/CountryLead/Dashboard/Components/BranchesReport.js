import React, { useEffect, useState } from 'react';
import { Button, Grid, LinearProgress, MenuItem, Select, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import chartData from './Chart-Data/Index';
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import EarningCard from './Chart/EarningCard';
import TotalLineChartCard from './Chart/TotalLineChartCard';
import PieChart from './Chart/PieChart';
import NewMainCard from 'ui-component/cards/NewMainCard';
import DonutChart from './Chart/DonutChart';
import TeamMembers from './Chart/TeamMembers';
import LinerTotalProgress from './Chart/LinerTotalProgress';
import LeadSource from './Chart/LeadSource';

const BranchesReport = ({ allColor, allBorderColor, branchName }) => {
    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = React.useState('January');

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard
            content={false}
            sx={{
                padding: '0px',
                boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.75)',
                '&:hover': {
                    boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.75)'
                }
            }}
        >
            <Grid container spacing={1} sx={{ padding: '8px 0 8px 8px' }}>
                {/* Card Head part */}
                <Grid item xs={12} md={3} sx={{ backgroundColor: allColor }}>
                    <Typography variant="h3" sx={{ fontSize: '1rem', color: '#ffffff', padding: '2px 10px' }}>
                        {branchName}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ backgroundColor: allColor }}>
                    <Typography variant="h4" align="right" sx={{ color: '#ffffff', padding: '5px 10px' }}>
                        Branch Target
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ backgroundColor: allColor, '&.MuiGrid-root': { pl: '0px' } }}>
                    <Typography variant="h3" sx={{ color: '#ffffff', padding: '2px 10px' }}>
                        $50,000
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{ backgroundColor: allColor, borderLeft: `5px solid ${allBorderColor}`, '&.MuiGrid-root': { pl: '0px' } }}
                >
                    <Typography variant="h4" sx={{ color: '#ffffff', padding: '5px 10px' }}>
                        TOP PERFORMERS
                    </Typography>
                </Grid>

                {/* Card Body part */}

                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', '&.MuiGrid-root': { pl: '20px' } }}>
                    <LinerTotalProgress />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DonutChart />
                </Grid>
                <Grid item xs={12} md={3} sx={{ '&.MuiGrid-root': { pr: '10px' } }}>
                    <LeadSource />
                </Grid>
                <Grid item xs={12} md={3} sx={{ borderLeft: '4px solid #ececec', '&.MuiGrid-root': { pl: '0px' } }}>
                    <TeamMembers allColor={allColor} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default BranchesReport;
