import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { PieGraphLoader } from 'ui-component/cards/Skeleton/BranchLoader';

// ==============================|| RADIAL BAR CHART ||============================== //

const RedialBarChart = () => {
    const theme = useTheme();
    const { navType } = useConfig();
    const { getTargetGraphData, getTargetGraphLoading } = useSelector((state) => state.clusterAction);

    const currentMonthData = getTargetGraphData?.currentMonthTarget !== null ? getTargetGraphData?.currentMonthTarget : {};
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];

    const [series] = useState([76, 67, 61, 90]);

    const secondary = theme.palette.secondary.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const error = theme.palette.error.main;

    const seriesData = [
        ((currentMonthData?.targets / currentMonthData?.targets) * 100).toFixed(0),
        ((currentMonthData?.remaining_target / currentMonthData?.targets) * 100).toFixed(2),
        ((currentMonthData?.confirm_business / currentMonthData?.targets) * 100).toFixed(2),
        ((currentMonthData?.completed_target / currentMonthData?.targets) * 100).toFixed(2)
    ];
    const redialBarChartOptions = {
        chart: {
            type: 'radialBar'
            // width: 450,
            // height: 450
        },
        xaxis: {
            labels: {
                style: {
                    colors: [primary, primary, primary, primary, primary, primary, primary]
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: [primary]
                }
            }
        },
        grid: {
            borderColor: navType === 'dark' ? darkLight + 20 : grey200
        },
        stroke: {
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                track: {
                    background: navType === 'dark' ? darkLight + 20 : grey200,
                    show: true,
                    startAngle: undefined,
                    endAngle: undefined,
                    strokeWidth: '50%',
                    opacity: 1,
                    margin: 5,
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                offsetX: 0,
                offsetY: 30,
                startAngle: 0,
                endAngle: 360,
                hollow: {
                    margin: 5,
                    size: '40%',
                    background: 'transparent',
                    image: undefined,
                    // imageWidth: 250,
                    // imageHeight: 250,
                    // imageOffsetX: 0,
                    // imageOffsetY: 10,
                    // imageClipped: true,
                    position: 'front',
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                }
            }
        },
        // labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        labels: ['Assigned', 'Remaining', 'Con. Business', 'Achieved'],
        // colors: ['#6dd9fd', '#6eda45', '#e63838'],
        colors: [primaryMain, error, secondary, successDark],
        legend: {
            show: true,
            floating: true,
            fontSize: '14px',
            position: 'top',
            offsetX: 0,
            offsetY: 10,
            labels: {
                useSeriesColors: true
            },
            markers: {
                size: 0
            },
            formatter(seriesName, opts) {
                return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}%`;
            },
            itemMargin: {
                vertical: 3
            }
        },
        series: seriesData,
        // series: [currentMonthData?.targets, currentMonthData?.completed_target, currentMonthData?.confirm_business]
        responsive: [
            {
                breakpoint: 450,
                // chart: {
                //     width: 280,
                //     height: 280
                // },
                options: {
                    legend: {
                        show: true,
                        position: 'top'
                    }
                }
            },
            {
                breakpoint: 1200,
                options: {
                    legend: {
                        show: true,
                        floating: true,
                        fontSize: '14px',
                        position: 'top',
                        offsetX: 0,
                        offsetY: 0
                    }
                }
            },
            {
                breakpoint: 1480,
                options: {
                    legend: {
                        show: true,
                        floating: true,
                        fontSize: '10px',
                        position: 'top',
                        offsetX: 0,
                        offsetY: 0
                    }
                }
            }
        ]
    };

    return (
        <MainCard title="Current Month Target" sx={{ boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
            {getTargetGraphLoading ? (
                // Show a loading state while data is being fetched
                <PieGraphLoader />
            ) : (
                <ReactApexChart options={redialBarChartOptions} series={redialBarChartOptions.series} type="radialBar" />
            )}
        </MainCard>
    );
};

export default RedialBarChart;
