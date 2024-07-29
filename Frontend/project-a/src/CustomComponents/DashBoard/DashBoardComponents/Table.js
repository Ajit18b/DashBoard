import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./table.css"; // Import custom CSS

Modal.setAppElement("#root"); // Ensure this matches your app's root element

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    r01: 0,
    r02: 0,
    r03: 0,
    r04: 0,
    r05: 0,
    r06: 0,
    r07: 0,
    r08: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/data");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      r01: item.r01,
      r02: item.r02,
      r03: item.r03,
      r04: item.r04,
      r05: item.r05,
      r06: item.r06,
      r07: item.r07,
      r08: item.r08,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/data/${id}`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8090/data/${editingItem.id}`, formData);
      fetchData(); // Refresh the data after update
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error updating item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="data-table-container">
      <h1 className="table-title">Data Table</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>R01</th>
            <th>R02</th>
            <th>R03</th>
            <th>R04</th>
            <th>R05</th>
            <th>R06</th>
            <th>R07</th>
            <th>R08</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.r01}</td>
              <td>{item.r02}</td>
              <td>{item.r03}</td>
              <td>{item.r04}</td>
              <td>{item.r05}</td>
              <td>{item.r06}</td>
              <td>{item.r07}</td>
              <td>{item.r08}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Data"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Data Point</h2>
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-row">
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R01:
                  <input
                    type="number"
                    name="r01"
                    value={formData.r01}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R02:
                  <input
                    type="number"
                    name="r02"
                    value={formData.r02}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R03:
                  <input
                    type="number"
                    name="r03"
                    value={formData.r03}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R04:
                  <input
                    type="number"
                    name="r04"
                    value={formData.r04}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R05:
                  <input
                    type="number"
                    name="r05"
                    value={formData.r05}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R06:
                  <input
                    type="number"
                    name="r06"
                    value={formData.r06}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R07:
                  <input
                    type="number"
                    name="r07"
                    value={formData.r07}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  R08:
                  <input
                    type="number"
                    name="r08"
                    value={formData.r08}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Update
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataTable;
