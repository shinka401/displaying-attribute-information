import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import ChartStreaming from "chartjs-plugin-streaming";
Chart.register(ChartStreaming);
// import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ja } from "date-fns/locale";

const RealTimeChart = () => {
  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              label: "Sample1",
              borderColor: "#abcde8",
              backgroundColor: "#abcde8",
              data: [],
            },
            {
              label: "Sample2",
              borderColor: "#c7def1",
              backgroundColor: "#c7def1",
              data: [],
            },
            {
              label: "Sample3",
              borderColor: "#c4b7f7",
              backgroundColor: "#c4b7f7",
              data: [],
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: "realtime",
              title: {
                display: true,
                text: "x軸の値",
              },
              adapters: {
                date: {
                  locale: ja,
                },
              },
              time: {
                unit: "second",
              },
              realtime: {
                duration: 30000,
                delay: 2000,
                refresh: 2000,
                pause: false,
                ttl: undefined,
                onRefresh: (chart) => {
                  const now = Date.now();
                  chart.data.datasets.forEach((dataset) => {
                    dataset.data.push({
                      x: now,
                      y: Math.floor(Math.random() * 101),
                    });
                  });
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
export default RealTimeChart;
