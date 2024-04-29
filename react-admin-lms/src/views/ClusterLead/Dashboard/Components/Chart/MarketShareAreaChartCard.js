/* eslint-disable prefer-template */
import React, { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography, Select, MenuItem } from '@mui/material';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import chartData from '../Chart-Data/market-share-area-chart';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter } from '@tabler/icons';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useSelector } from 'react-redux';

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const MarketShareAreaChartCard = () => {
    const theme = useTheme();

    const { navType } = useConfig();
    const { primary } = theme.palette.text;
    const secondaryMain = theme.palette.secondary.main;
    const errorMain = theme.palette.error.main;
    const primaryDark = theme.palette.primary.dark;
    const orangeMain = theme.palette.orange.light;
    const grey500 = theme.palette.grey[500];
    const { getDashboardData, getDashboardLoading } = useSelector((state) => state.clusterLeadAction);
    // console.log('🚀 getDashboardData:', getDashboardData?.lead_type);

    const dates = ['04-Oct-2023', '04-Oct-2023', '04-Oct-2023']; // Your date array
    const formattedDates = dates.map((dateString) => {
        const date = new Date(dateString);
        return date.toDateString();
    });

    function findLargestNumber(arr1, arr2, arr3) {
        const maxNumber = Math.max(...arr1.concat(arr2).concat(arr3));
        console.log('🚀 maxNumber:', maxNumber);

        return maxNumber;
    }

    React.useEffect(() => {
        const maxLengthArray = findLargestNumber(
            getDashboardData?.lead_type?.Email,
            getDashboardData?.lead_type?.LinkedIn,
            getDashboardData?.lead_type?.Upwork
        );
        const newChartData = {
            ...chartData.options,
            colors: [primaryDark, '#6cdf3a', '#eb7e25'],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light',
                x: {
                    format: 'dd/MM/yyyy'
                }
            },
            // title: {
            //     text: 'Lead Type',
            //     align: 'left',
            //     style: {
            //         fontSize: '16px',
            //         fontFamily: `'Poppins', sans-serif`,
            //         fontWeight: 500,
            // offsetY: -40
            //     }
            // },
            legend: {
                show: true,
                labels: {
                    colors: grey500
                },
                position: 'top',
                // offsetY: -10,
                horizontalAlign: 'left'
            },
            xaxis: {
                type: 'datetime',
                categories: getDashboardData?.lead_type?.date
            },
            yaxis: {
                // min: -1,
                max: maxLengthArray + 1,
                step: 1,
                labels: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8
                }
            },
            // legend: {
            //     labels: {
            //         colors: grey500
            //     },
            //     position: 'top',
            //     horizontalAlign: 'left',
            //     offsetY: -40
            // },
            series: [
                {
                    name: 'Email',
                    data: getDashboardData?.lead_type?.Email
                },
                {
                    name: 'LinkedIn',
                    data: getDashboardData?.lead_type?.LinkedIn
                },
                {
                    name: 'Upworks',
                    data: getDashboardData?.lead_type?.Upwork
                }
            ]
        };

        ApexCharts.exec('bde-lead-area-chart', 'updateOptions', newChartData);
    }, [navType, secondaryMain, errorMain, primaryDark, getDashboardData]);

    return (
        // <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, border: '0px solid' }}>
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, border: '0px solid' }}>
            <Box display="flex" justifyContent="flex-end" mx={2}>
                {/* <Select value={selectedMonth} onChange={handleMonthChange} variant="outlined" size="small">
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                </Select> */}
            </Box>
            <Chart {...chartData} />
        </MainCard>
    );
};
export default MarketShareAreaChartCard;
