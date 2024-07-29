import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SimpleBarChart() {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
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
          // Assuming `result` is an array of objects with properties r01 to r08 and date
          const labels = result.map((item) => item.date);
          const seriesData = [
            { data: result.map((item) => item.r01), label: "R01", id: "r01Id" },
            { data: result.map((item) => item.r02), label: "R02", id: "r02Id" },
            { data: result.map((item) => item.r03), label: "R03", id: "r03Id" },
            { data: result.map((item) => item.r04), label: "R04", id: "r04Id" },
            { data: result.map((item) => item.r05), label: "R05", id: "r05Id" },
            { data: result.map((item) => item.r06), label: "R06", id: "r06Id" },
            { data: result.map((item) => item.r07), label: "R07", id: "r07Id" },
            { data: result.map((item) => item.r08), label: "R08", id: "r08Id" },
          ];

          setData(seriesData);
          setXLabels(labels);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.wrapper}>
      <BarChart
        width={1500}
        height={400}
        series={data}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
