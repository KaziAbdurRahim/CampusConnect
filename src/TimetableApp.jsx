import { useState } from 'react';

const TimetableApp = () => {
  const initialData = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = ["08:00-09:20", "09:30-10:50", "11:00-12:20", "12:30-01:50", "02:00-03:20","03:30-04:50"];

  const [routines, setRoutines] = useState([{ data: JSON.parse(JSON.stringify(initialData)) }]);
  const [freeTime, setFreeTime] = useState(null);

  // Toggle cell selection
  const toggleCell = (routineIndex, rowIndex, cellIndex) => {
    const updatedRoutines = [...routines];
    const currentCell = updatedRoutines[routineIndex].data[rowIndex][cellIndex];
    updatedRoutines[routineIndex].data[rowIndex][cellIndex] = currentCell ? "" : "✅";
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
          combinedFreeTime[row][col] = "🎉";
        }
      }
    }

    setFreeTime(combinedFreeTime);
  };

  return (
    <div className="p-4 mx-auto w-full max-w-4xl">
      <h1 className="text-2xl text-center font-bold mb-4">Routine Scheduler</h1>

      {routines.map((routine, routineIndex) => (
        <div key={routineIndex} className="mb-6 container ">
          <h2 className="text-lg font-semibold">Routine {routineIndex + 1}</h2>
          <div className="">
            <table className="border-collapse border border-gray-300 text-center w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2">T/D</th>
                  {days.map((day, index) => (
                    <th key={index} className="border border-gray-300 ">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-gray-300 ">{slot}</td>
                    {routine.data[rowIndex].map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`border border-gray-300  cursor-pointer ${cell === "✅" ? " text-white" : ""}`}
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

      <div className='container '>
        {freeTime && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Common Free Time</h2>
            <div className="">
              <table className="border-collapse border border-gray-300 text-center w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 ">T/D</th>
                    {days.map((day, index) => (
                      <th key={index} className="border border-gray-300 ">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 ">{slot}</td>
                      {freeTime[rowIndex].map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`border border-gray-300 ${cell === "🎉" ? " text-white" : ""}`}
                        >
                          {cell || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center bg-base-200 rounded-lg">
         <p className='font-semibold'> If you find this project helpful, please consider giving it a star on GitHub! Your support is greatly appreciated. </p> <a href=" https://github.com/KaziAbdurRahim/CampusConnect.git" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" > ⭐️ Star this Project on GitHub </a> 
      <p className="mt-4"> © 2025 All rights reserved. </p></footer>
   
  

    </div>
    
  );
};

export default TimetableApp;
