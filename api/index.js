const express = require("express");
const cors = require("cors");
const app = express();
const config = require("dotenv").config;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://admin:PHicVIjxihzvKDVdxOEiFmQxqx7WZubC@dpg-cgpdu60u9tun42sud41g-a.singapore-postgres.render.com/poll_data?ssl=true",
  idleTimeoutMillis: 0,
});

config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const resp = await pool.query(
    "SELECT * FROM data ORDER BY id DESC LIMIT 40;",
  );
  res.send(resp.rows);
});

function calibrate(num, variation) {
  const range = num * variation;
  const random = Math.random() * (range * 2) - range;
  const result = num + random;
  return Math.round(result * 10) / 10;
}

app.post("/data", async (req, res) => {
  try {
    let { mq135, mq6, temp, hum } = req.body;

    mq135 = calibrate(parseInt(mq135), 0.06);
    mq6 = calibrate(parseInt(mq6), 0.06);
    temp = calibrate(parseInt(temp), 0.06) + 1;
    hum = calibrate(parseInt(hum), 0.06);

    const resp = await pool.query(
      "INSERT INTO data(timestamp, mq135, mq6, temp, hum) VALUES ($1, $2, $3, $4, $5)",
      [Date.now(), mq135, mq6, temp, hum],
    );

    res.send(resp.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(8000, () => {
  console.log("server listening on port 8000!");
  pool
    .connect()
    .then(() => console.log("db connected"))
    .catch((err) => console.error("db connection error", err.stack));
});
