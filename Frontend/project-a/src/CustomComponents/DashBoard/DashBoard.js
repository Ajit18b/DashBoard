import React from "react";
import Graph from "./DashBoardComponents/Graph";
import Piecharts from "./DashBoardComponents/Piechart";
import "./DashBoard.css"; // Import the CSS file
import DataTable from "./DashBoardComponents/Table";
import SimpleBarChart from "./DashBoardComponents/OverView";
import GaugeValueRange from "./DashBoardComponents/Average";

function DashBoard() {
  return (
    <div>
      <Graph />
      <GaugeValueRange />
      <SimpleBarChart />
      <Piecharts />
      <DataTable />
    </div>
  );
}

export default DashBoard;
