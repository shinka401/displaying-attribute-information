import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
);

import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useMemo, useState } from "react";

import fetcher from "./fetcher";

const LineChart = () => {
  const initArr = useMemo(() => new Array(60).fill(0), []);
  const labels = useMemo(() => [...initArr], [initArr]);

  const [genderCount, setGenderCount] = useState({
    male: [...initArr],
    female: [...initArr],
    total: [...initArr],
  });

  useEffect(() => {
    let interval = setInterval(() => {
      fetcher("/api/count").then((data) => {
        setGenderCount((cnt) => {
          const male = [...cnt.male.slice(1), data.count.male];
          const female = [...cnt.female.slice(1), data.count.female];
          const total = [...cnt.total.slice(1), data.count.male + data.count.female];
          return { male, female, total };
        });
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const legends = {
    male: `male:${genderCount.male.slice(-1)[0]}`,
    female: `female:${genderCount.female.slice(-1)[0]}`,
  };

  const GraphData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: legends.male,
        data: genderCount.male,
        fill: true,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: legends.female,
        data: genderCount.total,
        fill: true,
        backgroundColor: "rgb(192, 48 , 192)",
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <div>
      <Line data={GraphData} options={options} />
    </div>
  );
};
export default LineChart;
