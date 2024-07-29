import React, { useState } from "react";
import "./registration.css";

export default function DataForm() {
  const [date, setDate] = useState("");
  const [r01, setR01] = useState("");
  const [r02, setR02] = useState("");
  const [r03, setR03] = useState("");
  const [r04, setR04] = useState("");
  const [r05, setR05] = useState("");
  const [r06, setR06] = useState("");
  const [r07, setR07] = useState("");
  const [r08, setR08] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8090/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          r01: parseInt(r01, 10),
          r02: parseInt(r02, 10),
          r03: parseInt(r03, 10),
          r04: parseInt(r04, 10),
          r05: parseInt(r05, 10),
          r06: parseInt(r06, 10),
          r07: parseInt(r07, 10),
          r08: parseInt(r08, 10),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setMessage(`Data added successfully! ID: ${result.id}`);
      // Clear form fields
      setDate("");
      setR01("");
      setR02("");
      setR03("");
      setR04("");
      setR05("");
      setR06("");
      setR07("");
      setR08("");
    } catch (error) {
      console.error("Error adding data:", error);
      setMessage("Error adding data. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          R01:
          <input
            type="number"
            value={r01}
            onChange={(e) => setR01(e.target.value)}
            required
          />
        </label>
        <label>
          R02:
          <input
            type="number"
            value={r02}
            onChange={(e) => setR02(e.target.value)}
            required
          />
        </label>
        <label>
          R03:
          <input
            type="number"
            value={r03}
            onChange={(e) => setR03(e.target.value)}
            required
          />
        </label>
        <label>
          R04:
          <input
            type="number"
            value={r04}
            onChange={(e) => setR04(e.target.value)}
            required
          />
        </label>
        <label>
          R05:
          <input
            type="number"
            value={r05}
            onChange={(e) => setR05(e.target.value)}
            required
          />
        </label>
        <label>
          R06:
          <input
            type="number"
            value={r06}
            onChange={(e) => setR06(e.target.value)}
            required
          />
        </label>
        <label>
          R07:
          <input
            type="number"
            value={r07}
            onChange={(e) => setR07(e.target.value)}
            required
          />
        </label>
        <label>
          R08:
          <input
            type="number"
            value={r08}
            onChange={(e) => setR08(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
