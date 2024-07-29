import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Gauge } from "@mui/x-charts/Gauge";
import axios from "axios";

export default function GaugeValueRange() {
  const [averages, setAverages] = useState({
    r01: 0,
    r02: 0,
    r03: 0,
    r04: 0,
    r05: 0,
    r06: 0,
    r07: 0,
    r08: 0,
  });
  const [totalAverage, setTotalAverage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8090/data")
      .then((response) => {
        const data = response.data;
        const totals = data.reduce(
          (acc, item) => {
            acc.r01 += item.r01;
            acc.r02 += item.r02;
            acc.r03 += item.r03;
            acc.r04 += item.r04;
            acc.r05 += item.r05;
            acc.r06 += item.r06;
            acc.r07 += item.r07;
            acc.r08 += item.r08;
            return acc;
          },
          { r01: 0, r02: 0, r03: 0, r04: 0, r05: 0, r06: 0, r07: 0, r08: 0 }
        );

        const count = data.length;
        const newAverages = {
          r01: totals.r01 / count,
          r02: totals.r02 / count,
          r03: totals.r03 / count,
          r04: totals.r04 / count,
          r05: totals.r05 / count,
          r06: totals.r06 / count,
          r07: totals.r07 / count,
          r08: totals.r08 / count,
        };

        setAverages(newAverages);
        setTotalAverage(
          Object.values(newAverages).reduce((acc, avg) => acc + avg, 0) / 8
        );
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const gaugeData = [
    { label: "R01", value: averages.r01 },
    { label: "R02", value: averages.r02 },
    { label: "R03", value: averages.r03 },
    { label: "R04", value: averages.r04 },
    { label: "R05", value: averages.r05 },
    { label: "R06", value: averages.r06 },
    { label: "R07", value: averages.r07 },
    { label: "R08", value: averages.r08 },
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} container direction="column" alignItems="center">
        <Gauge
          width={200}
          height={200}
          value={totalAverage}
          valueMin={0}
          valueMax={100}
          label="Total Average"
        />
        <div style={{ marginTop: "8px", fontSize: "18px", fontWeight: "bold" }}>
          Total Average: {totalAverage.toFixed(2)}
        </div>
      </Grid>
      {gaugeData.map((gauge, index) => (
        <Grid
          item
          xs={6}
          sm={3}
          md={1.5}
          key={index}
          container
          direction="column"
          alignItems="center"
        >
          <Gauge
            width={100}
            height={100}
            value={gauge.value}
            valueMin={0}
            valueMax={100}
          />
          <div style={{ marginTop: "8px" }}>{gauge.label}</div>
        </Grid>
      ))}
    </Grid>
  );
}
