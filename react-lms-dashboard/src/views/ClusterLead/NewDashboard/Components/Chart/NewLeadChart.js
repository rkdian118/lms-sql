import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import value from 'assets/scss/_themes-vars.module.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';

// chart options
const areaChartOptions = {
    chart: {
        height: 350,
        type: 'area'
    },
    colors: [value.secondaryMain, value.primaryMain],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
        ]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        }
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
    series: [
        {
            name: 'Email',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'LinkedIn',
            data: [11, 32, 45, 32, 34, 52, 41]
        },
        {
            name: 'Upworks',
            data: [5, 25, 48, 15, 21, 28, 38]
        }
    ]
};

// ==============================|| AREA CHART ||============================== //

const NewLeadChart = () => {
    const theme = useTheme();
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const { getDashboardGraphData, getDashboardGraphLoading } = useSelector((state) => state.clusterLeadAction);
    const [series] = useState([
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
        // {
        //     name: 'Email',
        //     data: [31, 40, 28, 51, 42, 109, 100]
        // },
        // {
        //     name: 'LinkedIn',
        //     data: [11, 32, 45, 32, 34, 52, 41]
        // },
        // {
        //     name: 'Upworks',
        //     data: [5, 25, 48, 15, 21, 28, 38]
        // }
    ]);

    const [options, setOptions] = useState(areaChartOptions);
    React.useEffect(() => {
        const datesArray = [];
        // eslint-disable-next-line array-callback-return
        const newDates = getDashboardGraphData?.date.map((date) => {
            datesArray.push(moment(date).format('DD-MMM'));
        });
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.orange.main],
            xaxis: {
                type: 'datetime',
                categories: datesArray,
                style: {
                    fontSize: '10px'
                },
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
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            },
            legend: {
                labels: {
                    colors: 'grey.500'
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
        }));
    }, [navType, primary, darkLight, grey200, theme, getDashboardGraphData]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={options?.series} type="area" height={350} />
        </div>
    );
};

export default NewLeadChart;
