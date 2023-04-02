import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

function App() {
  const [chartData, _setChartData] = useState({
    labels: [
      1679249018335, 1679249020851, 1679249023434, 1679249025970, 1679249028345,
      1679249031089, 1679249033670, 1679249036417, 1679249038901, 1679249041662,
      1679249044117, 1679249046652, 1679249049332, 1679249051794, 1679249054552,
      1679249057017, 1679249059654, 1679249062353, 1679249064986, 1679249067360,
      1679249070127, 1679249072889, 1679249018335, 1679249020851, 1679249023434,
      1679249025970, 1679249028345, 1679249031089, 1679249033670, 1679249036417,
      1679249038901, 1679249041662, 1679249044117, 1679249046652, 1679249049332,
      1679249051794, 1679249054552, 1679249057017, 1679249059654, 1679249062353,
      1679249064986, 1679249067360, 1679249070127, 1679249072889,
    ],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [
          27.5, 29.3, 28.4, 27.3, 28.9, 30.1, 29.7, 27.4, 30, 28.5, 30.1, 28.4,
          28.9, 30.3, 29.5, 30.4, 30.3, 29.1, 30.5, 30.7, 27.9, 29.4, 27.5,
          29.3, 28.4, 27.3, 28.9, 30.1, 29.7, 27.4, 30, 28.5, 30.1, 28.4, 28.9,
          30.3, 29.5, 30.4, 30.3, 29.1, 30.5, 30.7, 27.9, 29.4,
        ],

        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  return (
    <div
      style={{
        height: "60vh",
        marginBottom: "1%",
        padding: "1%",
      }}
    >
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Air Pollution Monitoring System",
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                text: "Minutes",
                display: true,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Temperature",
              },
              suggestedMin: 10,
              suggestedMax: 55,
            },
          },
        }}
      />
    </div>
  );
}

export default App;

const data = {
  labels: [
    1679249018335, 1679249020851, 1679249023434, 1679249025970, 1679249028345,
    1679249031089, 1679249033670, 1679249036417, 1679249038901, 1679249041662,
    1679249044117, 1679249046652, 1679249049332, 1679249051794, 1679249054552,
    1679249057017, 1679249059654, 1679249062353, 1679249064986, 1679249067360,
    1679249070127, 1679249072889,
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [
        27.5, 29.3, 28.4, 27.3, 28.9, 30.1, 29.7, 27.4, 30, 28.5, 30.1, 28.4,
        28.9, 30.3, 29.5, 30.4, 30.3, 29.1, 30.5, 30.7, 27.9, 29.4,
      ],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// const config = {
//   type: "line",
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: "Chart.js Line Chart - Cubic interpolation mode",
//       },
//     },
//     interaction: {
//       intersect: false,
//     },
//     scales: {
//       x: {
//         display: true,
//         title: {
//           text: "Days",
//           display: true,
//         },
//       },
//       y: {
//         display: true,
//         title: {
//           display: true,
//           text: "Temperature",
//         },
//         suggestedMin: 10,
//         suggestedMax: 55,
//       },
//     },
//   },
// };
