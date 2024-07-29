import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Graph() {
  const [data, setData] = useState({
    dates: [],
    series1: [],
    series2: [],
    series3: [],
    series4: [],
    series5: [],
    series6: [],
    series7: [],
    series8: [],
  });
  const [activeSeries, setActiveSeries] = useState(null);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    // Fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/data");
        const result = await response.json();

        // Parse the result to match the required format
        const dates = result.map((item) => new Date(item.date).getTime());
        const series1 = result.map((item) => item.r01);
        const series2 = result.map((item) => item.r02);
        const series3 = result.map((item) => item.r03);
        const series4 = result.map((item) => item.r04);
        const series5 = result.map((item) => item.r05);
        const series6 = result.map((item) => item.r06);
        const series7 = result.map((item) => item.r07);
        const series8 = result.map((item) => item.r08);

        setData({
          dates,
          series1,
          series2,
          series3,
          series4,
          series5,
          series6,
          series7,
          series8,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleSeries = (seriesName) => {
    if (activeSeries === seriesName) {
      // If the active series is clicked again, show all series
      setActiveSeries(null);
      setShowAll(true);
    } else {
      // Set the active series and show only the selected series
      setActiveSeries(seriesName);
      setShowAll(false);
    }
  };

  const handleToggleAll = () => {
    if (showAll) {
      // Hide all series
      setShowAll(false);
      setActiveSeries(null);
    } else {
      // Show all series
      setShowAll(true);
      setActiveSeries(null);
    }
  };

  const getSeriesData = () => {
    // Return no series if showAll is false and activeSeries is null
    if (!showAll && activeSeries === null) {
      return [];
    }

    // Return all series if showAll is true
    if (showAll) {
      return [
        { data: data.series1, label: "R 1", color: "blue" },
        { data: data.series2, label: "R 2", color: "red" },
        { data: data.series3, label: "R 3", color: "green" },
        { data: data.series4, label: "R 4", color: "purple" },
        { data: data.series5, label: "R 5", color: "orange" },
        { data: data.series6, label: "R 6", color: "cyan" },
        { data: data.series7, label: "R 7", color: "magenta" },
        { data: data.series8, label: "R 8", color: "brown" },
      ];
    }

    // Return only the active series if showAll is false
    return [
      activeSeries === "series1"
        ? { data: data.series1, label: "Series 1", color: "blue" }
        : null,
      activeSeries === "series2"
        ? { data: data.series2, label: "Series 2", color: "red" }
        : null,
      activeSeries === "series3"
        ? { data: data.series3, label: "Series 3", color: "green" }
        : null,
      activeSeries === "series4"
        ? { data: data.series4, label: "Series 4", color: "purple" }
        : null,
      activeSeries === "series5"
        ? { data: data.series5, label: "Series 5", color: "orange" }
        : null,
      activeSeries === "series6"
        ? { data: data.series6, label: "Series 6", color: "cyan" }
        : null,
      activeSeries === "series7"
        ? { data: data.series7, label: "Series 7", color: "magenta" }
        : null,
      activeSeries === "series8"
        ? { data: data.series8, label: "Series 8", color: "brown" }
        : null,
    ].filter(Boolean);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleToggleAll} style={{ marginRight: 10 }}>
          {showAll ? "Hide All" : "Show All"}
        </button>
        <button
          onClick={() => handleToggleSeries("series1")}
          style={{ color: "blue" }}
        >
          R 1
        </button>
        <button
          onClick={() => handleToggleSeries("series2")}
          style={{ color: "red" }}
        >
          R 2
        </button>
        <button
          onClick={() => handleToggleSeries("series3")}
          style={{ color: "green" }}
        >
          R 3
        </button>
        <button
          onClick={() => handleToggleSeries("series4")}
          style={{ color: "purple" }}
        >
          R 4
        </button>
        <button
          onClick={() => handleToggleSeries("series5")}
          style={{ color: "orange" }}
        >
          R 5
        </button>
        <button
          onClick={() => handleToggleSeries("series6")}
          style={{ color: "cyan" }}
        >
          R 6
        </button>
        <button
          onClick={() => handleToggleSeries("series7")}
          style={{ color: "magenta" }}
        >
          R 7
        </button>
        <button
          onClick={() => handleToggleSeries("series8")}
          style={{ color: "brown" }}
        >
          R 8
        </button>
      </div>

      <LineChart
        xAxis={[
          {
            data: data.dates,
            type: "time",
            label: "Date",
            scaleType: "time",
            valueFormatter: (value) => new Date(value).toLocaleDateString(),
          },
        ]}
        series={getSeriesData()}
        height={300}
        margin={{ left: 50, right: 30, top: 40, bottom: 25 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}
