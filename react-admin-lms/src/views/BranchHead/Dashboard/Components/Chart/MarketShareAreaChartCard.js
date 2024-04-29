import React from 'react';

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
    const [selectedMonth, setSelectedMonth] = React.useState('January');

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primaryDark, '#6cdf3a', '#eb7e25'],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
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
                    opacityFrom: 0.4,
                    opacityTo: 0.6
                }
            },
            legend: {
                labels: {
                    colors: grey500
                },
                position: 'top',
                // offsetY: 20,
                horizontalAlign: 'left'
            },
            series: [
                {
                    name: 'Leads',
                    data: [30, 40, 30, 40, 30, 40, 30, 40, 20]
                },
                {
                    name: 'LinkedIn',
                    data: [23, 50, 25, 45, 35, 80, 60, 85, 15]
                },
                {
                    name: 'Upworks',
                    data: [25, 40, 35, 25, 39, 90, 80, 75, 10]
                }
            ]
        };

        ApexCharts.exec('market-share-area-chart', 'updateOptions', newChartData);
    }, [navType, secondaryMain, errorMain, primaryDark]);

    const updateChart = (newData) => {
        const newChartData = {
            ...chartData.options,
            colors: [primaryDark, '#6cdf3a', '#eb7e25'],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
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
            legend: {
                labels: {
                    colors: grey500
                },
                position: 'top',
                horizontalAlign: 'left'
            },
            chart: {
                type: 'area',
                height: 300,
                width: '100%'
            }
        };

        ApexCharts.exec('market-share-area-chart', 'updateOptions', newChartData);
        ApexCharts.exec('market-share-area-chart', 'updateSeries', newData.series);
    };

    const getChartDataForMonth = (selectedMonth) => {
        // Define your dataset here or fetch it from an API
        const data = {
            January: {
                series: [
                    {
                        name: 'Leads',
                        data: [30, 40, 30, 40, 30, 40, 30, 40, 20]
                    },
                    {
                        name: 'LinkedIn',
                        data: [23, 50, 25, 45, 35, 80, 60, 85, 15]
                    },
                    {
                        name: 'Upworks',
                        data: [25, 40, 35, 25, 39, 90, 80, 75, 10]
                    }
                ]
            },
            February: {
                series: [
                    {
                        name: 'Leads',
                        data: [35, 45, 35, 45, 35, 45, 35, 45, 25]
                    },
                    {
                        name: 'LinkedIn',
                        data: [28, 55, 30, 50, 40, 85, 65, 90, 20]
                    },
                    {
                        name: 'Upworks',
                        data: [30, 45, 40, 30, 44, 95, 85, 80, 15]
                    }
                ]
            }
            // Add data for more months as needed
        };

        return data[selectedMonth] || { series: [] };
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        // Update chart data based on the selected month
        // You can fetch new data from an API or modify existing data here
        const newData = getChartDataForMonth(event.target.value); // Modify this function to retrieve data for the selected month
        updateChart(newData);
        // console.log('🚀value:', event.target.value);
    };
    return (
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, border: '0px solid' }}>
            <Box display="flex" justifyContent="flex-end" m={2}>
                <Select value={selectedMonth} onChange={handleMonthChange} variant="outlined" size="small">
                    {/* <MenuItem value="">All Months</MenuItem> */}
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    {/* Add more months as needed */}
                </Select>
            </Box>
            <Chart {...chartData} />
        </MainCard>
    );
};
export default MarketShareAreaChartCard;
