import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ReactECharts from 'echarts-for-react';

const App = () => {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

  
  const startNumberGeneration = async () => {
    await axios.post('http://localhost:3001/random/start');
  }

  const stopNumberGeneration = async () => {
    await axios.post('http://localhost:3001/random/stop');
  };

  const chartOptions = {
    xAxis: { type: 'category', data: data.map((d) => d.timestamp) },
    yAxis: { type: 'value' },
    series: [{ data: data.map((d) => d.value), type: 'line' }],
  };

  return (
    <div>
      <h1>Random Number Generator</h1>
      <button onClick={startNumberGeneration}>Start</button> 
      <button onClick={stopNumberGeneration}>Stop</button>

      <ReactECharts option={chartOptions} />
    </div>
  );
};

export default App;
