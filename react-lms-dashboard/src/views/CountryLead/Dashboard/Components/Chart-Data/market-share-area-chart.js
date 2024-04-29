// ==============================|| DASHBOARD - MARKET SHARE AREA CHART ||============================== //

const chartData = {
    height: 200,
    type: 'area',
    options: {
        chart: {
            id: 'market-share-area-chart',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 80, 100]
            }
        },
        legend: {
            show: true,
            position: 'top'
            // offsetY: 20 // Set the desired padding value for the top
        },
        yaxis: {
            min: 1,
            max: 100,
            labels: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Youtube',
            data: [10, 90, 65, 85, 40, 80, 30]
        },
        {
            name: 'Facebook',
            data: [50, 30, 25, 15, 60, 10, 25]
        },
        {
            name: 'Twitter',
            data: [5, 50, 40, 55, 20, 40, 20]
        }
    ]
};

export default chartData;
