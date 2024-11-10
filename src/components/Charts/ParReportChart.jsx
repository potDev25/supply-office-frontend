import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ParReportChart = ({ data = [], text = '' }) => {
  const [state, setState] = useState({
    series: [
      { name: 'Total Cost', data: [] },
    ],
  });

  const options = {
    colors: ['#0c6476', '#bec7e7'],  // Total Cost and Quantity colors
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      }
    },
    xaxis: {
      categories: data.map((item) => item.status),
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        radius: 100,
      },
      labels: {
        style: {
          textTransform: 'uppercase'
        }
      }
    },
    fill: {
      opacity: 1,
    },
  };

  useEffect(() => {
    const priceData = data.map((item) => item.total_price);
    setState({
      series: [
        { name: 'Total Cost', data: priceData },
      ],
    });
  }, [data]);

  return (
    <div className="rounded-lg border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mt-3">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {text}
          </h4>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ParReportChart;
