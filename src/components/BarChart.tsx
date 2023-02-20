import {
  Chart as ChartJS,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(PointElement, CategoryScale, LinearScale, BarElement, Filler, Legend);

import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import fetcher from "./fetcher";

const BarChart = () => {
  const initArr = useMemo(() => new Array(60).fill(0), []);
  const labels = useMemo(() => [...initArr], [initArr]);

  const [genderCount, setGenderCount] = useState({
    male: [...initArr],
    female: [...initArr],
  });

  useEffect(() => {
    let interval = setInterval(() => {
      fetcher("/api/count").then((data) => {
        setGenderCount((cnt) => {
          const male = [...cnt.male.slice(1), data.count.male];
          const female = [...cnt.female.slice(1), data.count.female];
          return { male, female };
        });
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const legends = useMemo(() => {
    return {
      male: `Male:${genderCount.male.slice(-1)[0]}`,
      female: `Female:${genderCount.female.slice(-1)[0]}`,
    };
  }, [genderCount]);

  const GraphData: ChartData<"bar"> = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: legends.male,
          data: genderCount.male,
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: legends.female,
          data: genderCount.female,
          backgroundColor: "rgb(192, 48 , 192)",
        },
      ],
    };
  }, [labels, legends.male, legends.female, genderCount.male, genderCount.female]);

  const options: ChartOptions<"bar"> = useMemo(() => {
    return {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          position: "top" as const,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            display: false,
          },
        },
        y: {
          stacked: true,
        },
      },
    };
  }, []);
  return (
    <div>
      <Bar data={GraphData} options={options} />
    </div>
  );
};
export default BarChart;
