import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    height: '160px'
}));

const DonutChart = () => {
    const chartOptions = {
        chart: {
            type: 'donut'
            // height: 'auto',
            // width: '100%'
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true
                        }
                    }
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
                bottom: -80
            }
        },
        legend: {
            show: false // Set 'show' property to false to disable the legend
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ],
        series: [200, 150, 100, 50],
        labels: ['Achieved', 'Remaining', 'Pending', 'Complete'],
        colors: ['#3365c5', '#e63838', '#6dd9fd', '#6eda45'] // Change the colors of the series here
    };

    return (
        <MainCard content={false} sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <ReactApexChart options={chartOptions} series={chartOptions.series} height="80%" width="100%" type="donut" />
        </MainCard>
    );
};

export default DonutChart;
