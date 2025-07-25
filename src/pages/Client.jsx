import React, { useEffect, useState } from "react";
import API from "../api/api";

const Client = () => {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    slotDateTime: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchSlots = async () => {
    try {
      const res = await API.get("/slots/available");
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Failed to load available slots.");
    }
  };

  const fetchAppointments = async () => {
    if (!form.email) {
      setError("Please enter your email to fetch appointments.");
      return;
    }
    try {
      const res = await API.get(`/appointments/client/${form.email}`);
      setAppointments(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments.");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!form.clientName || !form.email || !form.slotDateTime) {
      setError("All fields are required.");
      return;
    }

    try {
      await API.post("/appointments", form); // ✔ No unused var now
      setMessage("Appointment booked successfully!");
      setError("");
      fetchSlots();
      fetchAppointments();
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("");
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to book appointment.");
      }
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const formatSlot = (slot) => {
    const date = new Date(slot.slotDateTime);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <select
          className="w-full border p-2"
          value={form.slotDateTime}
          onChange={(e) => setForm({ ...form, slotDateTime: e.target.value })}
          required
        >
          <option value="">Select a slot</option>
          {Array.isArray(slots) &&
            slots.map((slot) => (
              <option key={slot.id} value={slot.slotDateTime}>
                {formatSlot(slot)}
              </option>
            ))}
        </select>
        <textarea
          placeholder="Optional Notes"
          className="w-full border p-2"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Book Appointment
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">My Appointments</h3>
        <button
          onClick={fetchAppointments}
          className="bg-gray-300 px-4 py-1 mt-2 mb-4"
        >
          Load Appointments
        </button>
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id} className="border p-2 my-2">
              {formatSlot(appt.slot)} - {appt.clientName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Client;
