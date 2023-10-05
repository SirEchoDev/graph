import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import SimpleCalendar from './calendar';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    title: {
      text: "Course technique Graph"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: 24, label: "James" },
        { y: 24, label: "Richie" },
        { y: 50, label: "Eric" },
        { y: 14, label: "Jasper" },
        { y: 12, label: "Abe" },
        { y: 10, label: "Martinez" }
      ]
    }]
  }

  return (
    <div>
      <CanvasJSChart options={options} />
      <SimpleCalendar /> {/* Include the MyCalendar component */}
    </div>
  );
}

export default App;
