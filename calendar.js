import React, { useState } from 'react';
import './style.css';

const SimpleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({ date: null, time: '', description: '' });
  const [events, setEvents] = useState([]); // To store saved events

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const calendarCells = [...blanks, ...days].map((day, index) => (
      <div
        key={index}
        className={`calendar-cell ${day ? '' : 'blank'}`}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </div>
    ));

    return calendarCells;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setModalOpen(true);
  };

  const saveEvent = () => {
    if (eventInfo.date && eventInfo.time && eventInfo.description) {
      // Add the eventInfo to the events array
      setEvents([...events, eventInfo]);
      // Clear the eventInfo and close the modal
      setEventInfo({ date: selectedDate, time: '', description: '' });
      setModalOpen(false);
    } else {
      alert('Please enter event details before saving.');
    }
  };

  return (
    <div className="simple-calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Event Details for {selectedDate}</h3>
            <input
              type="text"
              placeholder="Time"
              value={eventInfo.time}
              onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={eventInfo.description}
              onChange={(e) =>
                setEventInfo({ ...eventInfo, description: e.target.value })
              }
            />
            <button onClick={saveEvent}>Save</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      {selectedDate && (
        <div className="event-info">
          <p>
            Event on {selectedDate} - Time: {eventInfo.time}, Description:{' '}
            {eventInfo.description}
          </p>
        </div>
      )}
      <div className="event-table">
        <h3>Saved Events</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleCalendar;
