/* eslint-disable func-names */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { PieGraphLoader } from 'ui-component/cards/Skeleton/BranchLoader';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    height: '160px'
}));

const PieChart = () => {
    const { getTargetGraphData, getTargetGraphLoading } = useSelector((state) => state.clusterAction);

    const currentMonthData = getTargetGraphData?.currentMonthTarget !== null ? getTargetGraphData?.currentMonthTarget : {};
    // console.log('getTargetGraphLoading:', getTargetGraphLoading);
    // console.log('currentMonthData:', currentMonthData);

    const chartOptions = {
        chart: {
            type: 'donut'
            // height: '210%'
            // width: '100%'
        },
        plotOptions: {
            pie: {
                // customScale: 0.8,
                startAngle: 0,
                endAngle: 360,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            // show: true
                            show: true,
                            label: 'Current Target',
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            // eslint-disable-next-line object-shorthand
                            formatter: function () {
                                return getTargetGraphLoading ? 'Loading...' : currentMonthData?.targets || 'N/A';
                            }
                            // formatter: function () {
                            //     return currentMonthData?.targets;
                            // }
                        },
                        value: {
                            show: true
                        }
                    }
                    // size: '80%'
                },
                dataLabels: {
                    position: 'bottom',
                    style: {
                        fontSize: '22px'
                    },
                    value: 'true'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            padding: {
                bottom: 10
            }
        },
        legend: {
            show: true
            // style:{}
            // position: 'right'
            // horizontalAlign: 'center' // Set 'show' property to false to disable the legend
        },
        responsive: [
            {
                breakpoint: 1367,
                chart: {
                    height: '150%'
                },
                options: {
                    // chart: {
                    //     width: 200
                    // },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    total: {
                                        show: true,
                                        label: 'Current Target',
                                        fontSize: '10px',
                                        fontFamily: 'Helvetica, Arial, sans-serif'
                                    },
                                    value: {
                                        show: true
                                    }
                                }
                                // size: '80%'
                            }
                        }
                    },
                    legend: {
                        show: true,
                        position: 'bottom',
                        horizontalAlign: 'center'
                    }
                }
            }
        ],
        // series: [5000, 3500, 1500],
        series: [currentMonthData?.targets, currentMonthData?.completed_target, currentMonthData?.remaining_target],
        labels: ['Assigned Target', 'Achieved Target', 'Remaining Target'],
        colors: ['#6dd9fd', '#6eda45', '#e63838'] // Change the colors of the series here
        // colors: ['#3365c5', '#e63838', '#6dd9fd', '#6eda45'] // Change the colors of the series here
    };

    return (
        <MainCard
            title="Current Month Target"
            // sx={{ '&>div': { p: 0, pb: '0px !important' }, cursor: 'pointer', boxShadow: '8', '&:hover': { boxShadow: '22' } }}
            sx={{ boxShadow: '4', '&:hover': { boxShadow: '12' } }}
        >
            {/* <ReactApexChart options={chartOptions} series={chartOptions.series} height="205%" type="donut" /> */}
            {getTargetGraphLoading ? (
                // Show a loading state while data is being fetched
                <PieGraphLoader />
            ) : (
                <ReactApexChart options={chartOptions} series={chartOptions.series} height="150%" type="donut" />
            )}
        </MainCard>
    );
};

export default PieChart;
