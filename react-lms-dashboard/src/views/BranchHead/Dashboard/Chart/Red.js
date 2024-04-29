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
        plotOptions: {
            radialBar: {
                track: {
                    background: navType === 'dark' ? darkLight + 20 : grey200
                },
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
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
            fontSize: '16px',
            position: 'left',
            offsetX: 0,
            offsetY: 15,
            labels: {
                useSeriesColors: true
            },
            markers: {
                size: 0
            },
            formatter(seriesName, opts) {
                return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}%`;
            }
            // itemMargin: {
            //     vertical: 3
            // }
        },
        series: seriesData,
        // series: [currentMonthData?.targets, currentMonthData?.completed_target, currentMonthData?.confirm_business]
        responsive: [
            {
                breakpoint: 450,
                chart: {
                    width: 280,
                    height: 280
                },
                options: {
                    legend: {
                        show: true,
                        position: 'bottom'
                    }
                }
            },
            // {
            //     breakpoint: 1200,
            //     options: {
            //         legend: {
            //             show: true,
            //             // floating: true,
            //             fontSize: '14px',
            //             position: 'bottom',
            //             horizontalAlign: 'center',
            //             floating: false,
            //             offsetX: 0,
            //             offsetY: -15
            //         }
            //     }
            // },
            {
                breakpoint: 1480,
                chart: {
                    width: 450,
                    height: 450
                },
                options: {
                    legend: {
                        show: true,
                        floating: true,
                        fontSize: '12px',
                        position: 'left',
                        horizontalAlign: 'center',
                        offsetX: -20,
                        offsetY: -15
                        // labels: {
                        //     useSeriesColors: true
                        // },
                        // markers: {
                        //     size: 0
                        // },
                        // formatter(seriesName, opts) {
                        //     return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}%`;
                        // },
                        // itemMargin: {
                        //     vertical: 3
                        // }
                    }
                }
            }
        ]
    };

    const totalValue = 66000;
    const confirmValue = 2050;

    // Calculate the percentage
    const percentage = (confirmValue / totalValue) * 100;

    return (
        <MainCard
            title="Current Month Target"
            // sx={{ '&>div': { p: 0, pb: '0px !important' }, cursor: 'pointer', boxShadow: '8', '&:hover': { boxShadow: '22' } }}
            sx={{ boxShadow: '8', '&:hover': { boxShadow: '22' } }}
        >
            {/* <ReactApexChart options={chartOptions} series={chartOptions.series} height="205%" type="donut" /> */}
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
