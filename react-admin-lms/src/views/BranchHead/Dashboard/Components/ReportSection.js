import React, { useEffect, useState } from 'react';
import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import chartData from './Chart-Data/Index';

import TotalIncomeDarkCard from './Chart/TotalIncomeDarkCard';
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import EarningCard from './Chart/EarningCard';
import TotalLineChartCard from './Chart/TotalLineChartCard';
import MarketShareAreaChartCard from './Chart/MarketShareAreaChartCard';

const ReportSection = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const onClickModel = (e) => {
        // setOpenModelDetail(true);
    };
    const CardWrapper = styled(MainCard)(({ theme }) => ({
        // backgroundColor: theme.palette.primary.light,
        display: 'flex',
        backgroundColor: '#e3edff',
        color: theme.palette.primary.light,
        margin: '10px',
        overflow: 'hidden',
        position: 'relative'
    }));
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container p={1} spacing={2}>
                <Grid item md={6}>
                    <EarningCard isLoading={isLoading} />
                </Grid>
                <Grid item md={6}>
                    <TotalLineChartCard
                        chartData={chartData.TotalLineCardChart1}
                        value="June"
                        title="45%"
                        percentage="45%"
                        bgColor="#5bb4ff"
                    />
                </Grid>
            </Grid>
            <MarketShareAreaChartCard isLoading={isLoading} />
            <Grid container spacing={2} p={1}>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Assigned Leads"
                        amount="500"
                        bgColor="#f9e1b4"
                        // textColor="#000000"
                        textColor="#e19e3a"
                        shapeColor="#e19e3a5e"
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Active Leads"
                        amount="300"
                        bgColor="#bcfde8"
                        textColor="#5fbf9d"
                        // textColor="#000000"
                        shapeColor="#5fbf9d4f"
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Dead Leads"
                        amount="200"
                        bgColor="#f4c7c7"
                        textColor="#d66868"
                        // textColor="#000000"
                        shapeColor="#d668685e"
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Converted Leads"
                        amount="02"
                        bgColor="#c5e3ff"
                        textColor="#6585a1"
                        // textColor="#000000"
                        shapeColor="#6585a161"
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Prospects"
                        amount="02"
                        bgColor="#c9fdc1"
                        textColor="#67b75a"
                        // textColor="#000000"
                        shapeColor="#67b75a59"
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        title="Call Done Lead"
                        amount="02"
                        bgColor="#f6cbff"
                        textColor="#b27cb4"
                        // textColor="#000000"
                        shapeColor="#b27cb466"
                    />
                </Grid>
            </Grid>
            <CardWrapper border={false} content={false}>
                <Box
                    sx={{
                        width: '5%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '10px',
                        backgroundColor: '#cbddff'
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            ' &.MuiGrid-root': { pt: '10px' }
                        }}
                    >
                        <Grid container alignItems="center">
                            <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ transform: 'rotate(-90deg)', textAlign: 'center' }}>
                                    June
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ p: 2, width: '95%' }}>
                    <Grid item md={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '10px' } }}>
                                <Grid container alignItems="center">
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="body2">Direct</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" align="right">
                                            80%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LinearProgress variant="determinate" value={80} color="primary" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '10px' } }}>
                                <Grid container alignItems="center">
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="body2">Social</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" align="right">
                                            50%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LinearProgress variant="determinate" value={50} color="secondary" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '10px' } }}>
                                <Grid container alignItems="center">
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="body2">Referral</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" align="right">
                                            20%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LinearProgress variant="determinate" value={20} color="primary" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </MainCard>
    );
};

export default ReportSection;
