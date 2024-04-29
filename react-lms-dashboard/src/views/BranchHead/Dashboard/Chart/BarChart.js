import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third party
import ApexCharts from 'apexcharts';

// project imports

import AnalyticsChartCard from 'ui-component/cards/AnalyticsChartCard';
import { gridSpacing } from 'store/constant';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

const BarChart = (props) => {
    const theme = useTheme();
    const { getTargetGraphData, getTargetGraphLoading } = useSelector((state) => state.clusterAction);
    // console.log('🚀getTargetGraphData:', getTargetGraphData);
    const backColor = theme.palette.background.paper;
    const secondary = theme.palette.secondary.main;
    const error = theme.palette.error.main;
    const primary = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const orange = theme.palette.orange.main;
    const orangeDark = theme.palette.orange.dark;
    const grey500 = theme.palette.grey[500];
    // const { getDashboardData, getDashboardLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀 getDashboardData:', getDashboardData?.lead_type);
    let AllMonth = [];
    let AllTargets = [];
    let AllComplete = [];
    // let AllRemaining = [];

    // AllRemaining = getTargetGraphData?.map((data) => data.remaining_target); // }

    AllMonth = getTargetGraphData?.targets?.map((data) => data.target_month);
    AllTargets = getTargetGraphData?.targets?.map((data) => data.targets);
    AllComplete = getTargetGraphData?.targets?.map((data) => data.completed_target);
    // React.useEffect(() => {
    // }, [AllMonth, AllTargets, AllComplete, getTargetGraphData]);

    const chartData = {
        height: 350,
        type: 'bar',
        options: {
            chart: {
                id: 'percentage-chart',
                sparkline: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            title: {
                // text: 'Assigned Target For This Year',
                align: 'left',
                // margin: 10,
                offsetX: 10,
                offsetY: 30,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                }
            },
            // colors: [orange, successDark, grey500, error],
            colors: [primary, successDark, orange, error],
            legend: {
                show: true,
                labels: {
                    colors: grey500
                },
                position: 'bottom',
                // offsetY: -10,
                horizontalAlign: 'center'
            },
            plotOptions: {
                bar: {
                    columnWidth: '55%',
                    distributed: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                colors: 'transparent'
            },
            yaxis: {
                // max: maxLengthArray + 1,
                // max: 8,
                // min: -1,
                step: 1,
                labels: {
                    show: true
                }
            },
            xaxis: {
                categories:
                    AllMonth.length > 0
                        ? AllMonth
                        : [
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December'
                          ]
            }
        },
        series: [
            {
                name: 'Assigned',
                data: AllTargets
                // data: [100, 150, 100, 90, 100, 150, 100, 90, 40, 50, 75, 65]
            },
            {
                name: 'Achieved',
                data: AllComplete
                // data: [200, 150, 100, 50, 200, 150, 100, 50, 40, 50, 75, 65]
            }
            // {
            //     name: 'Remaining',
            //     data: AllRemaining
            //     // data: [200, 150, 100, 50, 200, 150, 100, 50, 40, 50, 75, 65]
            // }
        ]
    };

    return (
        // <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, cursor: 'pointer', boxShadow: '8', '&:hover': { boxShadow: '22' } }}>
        <AnalyticsChartCard chartData={chartData} />
        // </MainCard>
    );
};

export default BarChart;
