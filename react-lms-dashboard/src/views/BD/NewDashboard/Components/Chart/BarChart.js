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
    const { PDFData } = props;
    const backColor = theme.palette.background.paper;
    const secondary = theme.palette.secondary.main;
    const error = theme.palette.error.main;
    const primary = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const orange = theme.palette.orange.main;
    const orangeDark = theme.palette.orange.dark;
    const grey500 = theme.palette.grey[500];
    const { getDashboardGraphData, getDashboardLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀 getDashboardGraphData:', getDashboardGraphData?.lead_type);

    function findLargestNumber(arr1, arr2, arr3) {
        const maxNumber = Math.max(...arr1.concat(arr2).concat(arr3));
        // console.log('🚀 maxNumber:', maxNumber);

        return maxNumber;
    }
    //   React.useEffect(() => {
    //     const newAnalyticsChartCardData = {
    //       ...chartData.AnalyticsChartCardData.options,
    //       colors: [primary, successDark, error, orangeDark],
    //     };

    //     ApexCharts.exec(
    //       `percentage-chart`,
    //       "updateOptions",
    //       newAnalyticsChartCardData
    //     );
    //   }, [backColor, secondary, error, primary, successDark, orange, orangeDark]);
    const maxLengthArray = findLargestNumber(getDashboardGraphData?.Email, getDashboardGraphData?.LinkedIn, getDashboardGraphData?.Upwork);

    const chartData = {
        height: 340,
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
            colors: [successDark, primary, orange],
            legend: {
                show: true,
                labels: {
                    colors: grey500
                },
                position: 'top',
                // offsetY: -10,
                horizontalAlign: 'left'
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    distributed: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
            yaxis: {
                max: maxLengthArray + 1,
                // max: 8,
                // min: -1,
                step: 0,
                tickAmount: 5, // Increase the number of ticks on the y-axis
                forceNiceScale: true,
                labels: {
                    show: true
                }
            },
            xaxis: {
                categories: getDashboardGraphData?.date
            }
        },
        series: [
            {
                name: 'Email',
                data: getDashboardGraphData?.Email
            },
            {
                name: 'LinkedIn',
                data: getDashboardGraphData?.LinkedIn
            },
            {
                name: 'Upworks',
                data: getDashboardGraphData?.Upwork
            }
        ]
    };

    return <AnalyticsChartCard chartData={chartData} title="Assigned Leads For This Month" />;
};

export default BarChart;
