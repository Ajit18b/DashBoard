import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

// Custom Tooltip Formatting
const formatTooltip = (value) => `${value.toFixed(1)}%`;

export default function Piecharts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched data:", result);

        if (Array.isArray(result)) {
          // Aggregate data
          const totalConsumption = result.reduce((totals, item) => {
            for (let key in item) {
              if (key.startsWith("r")) {
                totals[key] = (totals[key] || 0) + item[key];
              }
            }
            return totals;
          }, {});

          const totalSum = Object.values(totalConsumption).reduce(
            (sum, value) => sum + value,
            0
          );

          // Prepare and sort pie data
          const pieData = Object.entries(totalConsumption)
            .map(([key, value]) => ({
              id: key,
              value: (value / totalSum) * 100,
              label: key,
              color: getRandomColor(),
            }))
            .sort((a, b) => b.value - a.value); // Sort by value in descending order

          setData(pieData);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderLabel = (entry) =>
    `${entry.label}: ${formatTooltip(entry.value)}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "-120px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Over All % Share of Each
      </Typography>
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 40,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 270,
            cx: 200,
            cy: 200,
            labelLine: false,
            label: renderLabel,
            tooltip: {
              formatter: ({ value }) => formatTooltip(value), // Ensure correct formatting
            },
          },
        ]}
        width={500}
        height={400}
      />
    </div>
  );
}
