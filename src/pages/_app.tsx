import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import ChartStreaming from "chartjs-plugin-streaming";
Chart.register(ChartStreaming);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
