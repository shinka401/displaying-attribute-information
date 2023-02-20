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
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof fetch>) =>
  await fetch(...args).then((res) => {
    if (!res.ok) throw new Error("データの取得に失敗");
    return res.json();
  });

const RealTimeChart = () => {
  const initArr = new Array(60).fill(0);
  const [genderCount, setGenderCount] = useState({
    male: [...initArr],
    female: [...initArr],
    total: [...initArr],
  });
  useSWR("/api/count", fetcher, {
    refreshInterval: 1000,
    onSuccess: (data) => {
      setGenderCount((cnt) => {
        const male = [...cnt.male.slice(1), cnt.male.slice(-1)[0] + data.count.male];
        const female = [...cnt.female.slice(1), cnt.male.slice(-1)[0] + data.count.female];
        const total = [
          ...cnt.total.slice(1),
          cnt.total.slice(-1)[0] + data.count.male + data.count.female,
        ];
        return { male, female, total };
      });
    },
  });
  const labels = genderCount.male.map((cnt, index) => index);
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
  };
  return (
    <div>
      <Line data={GraphData} options={options} />
    </div>
  );
};
export default RealTimeChart;
