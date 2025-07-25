import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [slotRes, apptRes] = await Promise.all([
        API.get("/slots/available"),
        API.get("/appointments/admin", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setSlots(slotRes.data);
      setAppointments(apptRes.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load data");
    }
  };

  const addSlot = async () => {
    if (!dateTime) return;
    try {
      await API.post(
        "/slots",
        { slotDateTime: dateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDateTime("");
      setMessage("Slot added successfully");
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add slot");
    }
  };

  const deleteSlot = async (id) => {
    try {
      await API.delete(`/slots/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Slot deleted");
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete slot");
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await API.delete(`/appointments/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Appointment cancelled");
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to cancel appointment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      {message && <p className="text-green-600">{message}</p>}

      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl mb-2">Add New Slot</h3>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            className="flex-grow border rounded p-2"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <button
            onClick={addSlot}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Add Slot
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl mb-2">Available Slots</h3>
          <ul className="space-y-2">
            {slots.map((slot) => (
              <li
                key={slot.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <span>{new Date(slot.slotDateTime).toLocaleString()}</span>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
            {slots.length === 0 && <li>No available slots.</li>}
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">Booked Appointments</h3>
          <ul className="space-y-2">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <div>
                  <strong>{appt.clientName}</strong> ({appt.email}) <br />
                  {new Date(appt.slotDateTime).toLocaleString()}
                </div>
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="text-red-600 hover:underline"
                >
                  Cancel
                </button>
              </li>
            ))}
            {appointments.length === 0 && <li>No booked appointments.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
