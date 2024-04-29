// ==============================|| DASHBOARD - MARKET SHARE AREA CHART ||============================== //
const chartData = {
    height: 300,
    type: 'area',
    options: {
        chart: {
            // id: 'market-share-area-chart',
            // stacked: true,
            id: 'bde-lead-area-chart',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            },
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                // shadeIntensity: 1
                // opacityFrom: 0.5,
                // opacityTo: 0,
                // stops: [0, 80, 100]
            }
        },
        grid: {
            show: true,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            row: {
                colors: undefined
                // opacity: 0.8
            },
            column: {
                colors: undefined
                // opacity: 0.5
            },
            padding: {
                top: 40,
                right: 20,
                bottom: 40,
                left: 30
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            // offsetX: 10,
            // offsetY: 10,
            labels: {
                useSeriesColors: false,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400
                }
            }
            // markers: {
            //     width: 16,
            //     height: 16,
            //     radius: 5
            // }
            // itemMargin: {
            //     horizontal: 15,
            //     vertical: 8
            // }
        },
        xaxis: {
            style: {
                fontSize: '10px'
            },
            // offsetY: -10,
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
            }
            // tickAmount: 10
        },
        yaxis: {
            // min: 1,
            // max: 100,
            labels: {
                show: true,
                align: 'right',
                // minWidth: 0,
                // maxWidth: 160,
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label'
                },
                offsetX: 15,
                offsetY: 0,
                rotate: 0
            }
        }
    },
    series: [
        {
            name: 'Email',
            data: [10, 90, 65, 85, 40, 80, 30]
        },
        {
            name: 'LinkedIn',
            data: [50, 30, 25, 15, 60, 10, 25]
        },
        {
            name: 'Upwork',
            data: [5, 50, 40, 55, 20, 40, 20]
        }
    ]
};

export default chartData;
