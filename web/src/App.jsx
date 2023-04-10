import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

function Card() {
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("istanbul");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");
  useEffect(() => {
    getWeatherData();
  }, []);
  const getWeatherData = () => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=e203317f0df5474c05874e35b030eda3`,
    })
      .then((response) => {
        setTemperature(Math.round(response.data.main.temp - 273.15));
        setDesc(response.data.weather[0].description);
        setName(response.data.name);
        setHumidity(response.data.main.humidity);
        setVisibility(response.data.visibility / 1000);
        setWineSpeed(response.data.wind.speed);
        setWicon(response.data.weather[0].icon);
        console.log(response);
      })
      .catch((error) => {});
  };

  return (
    <div className="">
      <div className="">
        <div id="card" className="weather">
          <div className="details">
            <div className="temp">
              {temperature}
              <span>&deg;</span>
            </div>
            <div className="right">
              <div id="summary">{desc}</div>
              <div style={{ fontWeight: "bold", marginTop: "4px" }}>{name}</div>
            </div>
          </div>
          <img className="weatherimg" alt="image1" src={`${wicon}.svg`} />
          <div className="infos">
            <img
              alt="humidity1"
              className="humidityimg"
              style={{ width: "5", height: "5" }}
              src="humidity.svg"
            ></img>
            <div className="humidity">Humidity {humidity}%</div>
            <img
              alt="visibility1"
              className="visibilityimg"
              style={{ width: "5", height: "5" }}
              src="visibility.svg"
            ></img>
            <div className="visibility">Visibility {visibility} km</div>
            <img
              alt="windspeed1"
              className="windimg"
              style={{ width: "5", height: "5" }}
              src="wind.svg"
            ></img>
            <div className="windspeed">Wind Speed {windspeed} km</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tempAvg, setTempAvg] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:8000/");
      console.log(data.data);
      setTempChartData((prev) => {
        return {
          ...prev,
          labels: data.data.map((item) => {
            let dt = new Date(parseInt(item.timestamp));
            setTempAvg((prev) => (prev + parseInt(item.temp)) / 2);
            return `${dt.getHours()}:${dt.getMinutes()}`;
          }),
          datasets: [
            {
              ...prev.datasets[0],
              data: data.data.map((item) => item.temp),
            },
          ],
        };
      });
      setMQChartData((prev) => {
        return {
          ...prev,
          labels: data.data.map((item) => {
            let dt = new Date(parseInt(item.timestamp));
            return `${dt.getHours()}:${dt.getMinutes()}`;
          }),
          datasets: [
            {
              ...prev.datasets[0],
              data: data.data.map((item) => item.mq135),
            },
          ],
        };
      });
    }
    fetchData();
  }, []);
  const [tempChartData, setTempChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],

        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const [mqChartData, setMQChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "MQ135 (ppm)",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  return (
    <>
      <div
        style={{
          height: "60vh",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <Line
          data={tempChartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
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

        <Line
          data={mqChartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
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
                  text: "PPM",
                },
                suggestedMin: 10,
                suggestedMax: 55,
              },
            },
          }}
        />

        <Card />
      </div>
      {/* <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Average Temperature: {tempAvg.toPrecision(4)}
      </h1> */}
    </>
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
