import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Stocks = ({ data = [], text = '' }) => {
  const [state, setState] = useState({
    series: [
      { name: 'Total Cost', data: [] },
      { name: 'Quantity', data: [] },
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
        horizontal: false,
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
        colors: ['#000000']
      }
    },
    xaxis: {
      categories: data.map((item) => item.supply_name),
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
    },
    fill: {
      opacity: 1,
    },
  };

  useEffect(() => {
    const priceData = data.map((item) => item.total_price);
    const quantityData = data.map((item) => item.quantity);
    setState({
      series: [
        { name: 'Total Cost', data: priceData },
        { name: 'Quantity', data: quantityData },
      ],
    });
  }, [data]);

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
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

export default Stocks;
