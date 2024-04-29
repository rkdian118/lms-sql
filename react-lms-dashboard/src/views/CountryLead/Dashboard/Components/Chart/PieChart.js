import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    height: '160px'
}));

const PieChart = () => {
    const chartOptions = {
        chart: {
            type: 'donut',
            height: 'auto',
            width: '100%'
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 10,
                dataLabels: {
                    position: 'bottom',
                    style: {
                        fontSize: '22px' // Adjust data label font size if needed
                    }
                }
            },
            donut: {
                size: '75%' // Increase the donut size to make the series wider
            }
        },
        grid: {
            padding: {
                bottom: -80
            }
        },
        legend: {
            position: 'bottom'
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
        series: [70, 30],
        labels: ['Achieved', 'Remaining'],
        colors: ['#5bb4ff', '#e63838'] // Change the colors of the series here
    };

    return (
        <MainCard border={false} content={false} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" width="100%" />
        </MainCard>
    );
};

export default PieChart;
