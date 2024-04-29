import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';
import { useSelector } from 'react-redux';

// ==============================|| LINE CHART ||============================== //

const MixedChart = () => {
    const theme = useTheme();
    const { navType } = useConfig();
    const { getTargetGraphData, getTargetGraphLoading } = useSelector((state) => state.clusterAction);
    // const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const primary = theme.palette.primary.main;
    const grey200 = theme.palette.grey[200];
    const backColor = theme.palette.background.paper;
    const error = theme.palette.error.main;
    const successDark = theme.palette.success.main;
    const orange = theme.palette.orange.main;
    const orangeDark = theme.palette.orange.dark;
    const grey500 = theme.palette.grey[500];
    const secondary = theme.palette.secondary.main;
    const primaryMain = theme.palette.primary.main;
    let AllMonth = [];
    let AllTargets = [];
    let AllCompleteTarget = [];
    let AllConfirmBusiness = [];

    AllConfirmBusiness = getTargetGraphData?.targets?.map((data) => data.confirm_business); // }

    AllMonth = getTargetGraphData?.targets?.map((data) => data.target_month);
    AllTargets = getTargetGraphData?.targets?.map((data) => data.targets);
    AllCompleteTarget = getTargetGraphData?.targets?.map((data) => data.completed_target);

    // const [options, setOptions] = useState(mixedChartOptions);
    const mixedChartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            },
            zoom: {
                enabled: false
            },
            // stacked: false,
            height: 200
        },
        colors: [secondary, primary, successDark, orange, error],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4],
            curve: 'smooth'
        },
        xaxis: {
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label'
                }
            },
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
        },
        legend: {
            show: true,
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 10,
            offsetY: 10,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        yaxis: [
            {
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },

                tooltip: {
                    enabled: true
                }
            }
        ],
        tooltip: {
            theme: navType === 'dark' ? 'dark' : 'light',
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            }
        },
        series: [
            {
                name: 'Assigned',
                type: 'column',
                data: AllTargets
                // data: [100, 150, 100, 90, 100, 150, 100, 90, 40, 50, 75, 65]
            },
            {
                name: 'Upfront',
                type: 'column',
                data: AllCompleteTarget
            },
            {
                name: 'Confirm Business',
                type: 'line',
                data: AllConfirmBusiness
                // data: [200, 150, 100, 50, 200, 150, 100, 50, 40, 50, 75, 65]
            }
            // {
            //     name: 'Remaining',
            //     data: AllConfirmBusiness
            //     // data: [200, 150, 100, 50, 200, 150, 100, 50, 40, 50, 75, 65]
            // }
        ]
    };
    return (
        // <div id="chart">
        <ReactApexChart options={mixedChartOptions} series={mixedChartOptions.series} height={600} type="line" />
        // </div>
    );
};

export default MixedChart;
