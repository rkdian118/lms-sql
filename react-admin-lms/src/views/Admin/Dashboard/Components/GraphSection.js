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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonthStartModels from './MonthStartModels';

const GraphSection = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [openModel, setOpenModel] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container p={1} spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            size="large"
                            onClick={() => setOpenModel(true)}
                            sx={{ color: '#9c60dc', border: '1px solid #9c60dc' }}
                            endIcon={<CalendarMonthIcon />}
                        >
                            Month Start
                        </Button>
                        <Select value={selectedMonth} onChange={handleMonthChange} variant="outlined" size="small">
                            {/* <MenuItem value="">All Months</MenuItem> */}
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            {/* Add more months as needed */}
                        </Select>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <EarningCard isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TotalLineChartCard
                        chartData={chartData.TotalLineCardChart1}
                        value="June"
                        title="45%"
                        percentage="45%"
                        bgColor="#5bb4ff"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <PieChart />
                </Grid>
            </Grid>
            {openModel && <MonthStartModels open={openModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default GraphSection;
