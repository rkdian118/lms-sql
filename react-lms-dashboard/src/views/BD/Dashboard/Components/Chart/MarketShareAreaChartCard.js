/* eslint-disable prefer-template */
import React, { useMemo } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import chartData from '../Chart-Data/market-share-area-chart';
import { useSelector } from 'react-redux';
import moment from 'moment';

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const MarketShareAreaChartCard = () => {
    const theme = useTheme();

    const { navType } = useConfig();
    const { primary } = theme.palette.text;
    const secondaryMain = theme.palette.secondary.main;
    const errorMain = theme.palette.error.main;
    const primaryDark = theme.palette.primary.dark;
    const orangeMain = theme.palette.orange.main;
    const grey500 = theme.palette.grey[500];
    const { getDashboardGraphData, getDashboardGraphLoading } = useSelector((state) => state.businessAction);

    const dates = ['04-Oct-2023', '04-Oct-2023', '04-Oct-2023']; // Your date array
    const formattedDates = dates.map((dateString) => {
        const date = new Date(dateString);
        return date.toDateString();
    });

    function findLargestNumber(arr1, arr2, arr3) {
        const maxNumber = Math.max(...arr1.concat(arr2).concat(arr3));
        return maxNumber;
    }

    React.useEffect(() => {
        const maxLengthArray = findLargestNumber(
            getDashboardGraphData?.Email,
            getDashboardGraphData?.LinkedIn,
            getDashboardGraphData?.Upwork
        );

        // eslint-disable-next-line array-callback-return
        const datesArray = [];
        // eslint-disable-next-line array-callback-return
        const newDates = getDashboardGraphData?.date.map((date) => {
            datesArray.push(moment(date).format('DD-MMM'));
        });

        const newChartData = {
            ...chartData.options,
            // colors: [primaryDark, '#6cdf3a', '#eb7e25'],
            colors: [primaryDark, secondaryMain, orangeMain],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            },
            legend: {
                show: true,
                labels: {
                    colors: grey500
                }
            },
            xaxis: {
                type: 'datetime',
                categories: datesArray,
                style: {
                    fontSize: '10px'
                },
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary],
                        fontSize: '12px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label'
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    // minWidth: 0,
                    style: {
                        colors: [primary],
                        fontSize: '12px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-yaxis-label'
                    },
                    offsetX: 15,
                    offsetY: 0,
                    rotate: 0
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

        ApexCharts.exec('bde-lead-area-chart', 'updateOptions', newChartData);
    }, [navType, secondaryMain, errorMain, primaryDark, getDashboardGraphData]);

    return (
        // <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, border: '0px solid' }}>
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' }, border: '0px solid' }}>
            <div id="chart">
                <Chart {...chartData} type="area" />
            </div>
        </MainCard>
    );
};
export default MarketShareAreaChartCard;
