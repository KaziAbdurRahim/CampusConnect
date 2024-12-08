import React, { useState } from 'react';

const TimetableApp = () => {
  const initialData = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["08:00 AM - 09:20 AM", "09:30 AM - 10:50 AM", "11:00 AM - 12:20 PM", "12:30 PM - 01:50 PM", "02:00 PM - 03:20 PM"];

  const [routines, setRoutines] = useState([{ data: JSON.parse(JSON.stringify(initialData)) }]);
  const [freeTime, setFreeTime] = useState(null);

  // Toggle cell selection
  const toggleCell = (routineIndex, rowIndex, cellIndex) => {
    const updatedRoutines = [...routines];
    const currentCell = updatedRoutines[routineIndex].data[rowIndex][cellIndex];
    updatedRoutines[routineIndex].data[rowIndex][cellIndex] = currentCell ? "" : "selected";
    setRoutines(updatedRoutines);
  };

  // Add a new blank routine
  const addRoutine = () => {
    setRoutines([...routines, { data: JSON.parse(JSON.stringify(initialData)) }]);
  };

  // Find common free time
  const findFreeTime = () => {
    const combinedFreeTime = JSON.parse(JSON.stringify(initialData));

    for (let row = 0; row < initialData.length; row++) {
      for (let col = 0; col < days.length; col++) {
        const isFree = routines.every(routine => !routine.data[row][col]);
        if (isFree) {
          combinedFreeTime[row][col] = "free";
        }
      }
    }

    setFreeTime(combinedFreeTime);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Routine Scheduler</h1>

      {routines.map((routine, routineIndex) => (
        <div key={routineIndex} className="mb-6 overflow-x-auto">
          <h2 className="text-lg font-semibold">Routine {routineIndex + 1}</h2>
          <table className="border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-2 py-2">Time/Day</th>
                {days.map((day, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-gray-300 px-2 py-2">{slot}</td>
                  {routine.data[rowIndex].map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`border border-gray-300 px-4 py-2 cursor-pointer ${cell === "selected" ? "bg-green-500 text-white" : ""}`}
                      onClick={() => toggleCell(routineIndex, rowIndex, cellIndex)}
                    >
                      {cell || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={addRoutine}
      >
        Add Routine
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-4"
        onClick={findFreeTime}
      >
        Find Free Time
      </button>

      {freeTime && (
        <div className="mt-6 overflow-x-auto">
          <h2 className="text-lg font-semibold">Common Free Time</h2>
          <table className="border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-2 py-2">Time/Day</th>
                {days.map((day, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-gray-300 px-2 py-2">{slot}</td>
                  {freeTime[rowIndex].map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`border border-gray-300 px-4 py-2 ${cell === "free" ? "bg-green-500 text-white" : ""}`}
                    >
                      {cell || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimetableApp;
