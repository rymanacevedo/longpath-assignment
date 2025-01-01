import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {io, Socket} from 'socket.io-client';
import ReactECharts from 'echarts-for-react';

const App = () => {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [frequency, setFrequency] = useState(1000);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('status', (data) => {
      console.log(data);
    });

    newSocket.on('random-number', (data) => {
      console.log('New number received:', data);
      setData((prevData) => [...prevData, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  const startNumberGeneration = async () => {
    if(!socket) {
      return;
    }

    socket.emit('start');
  }

  const stopNumberGeneration = async () => {
    if(!socket) {
      return;
    }

    socket.emit('stop');
  };

  const updateFrequency = async () => {
    const response: any = await axios.post('http://localhost:3001/random/frequency', {
      frequency
    });
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

    
      <input value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} id="updateFrequency" type='number'/>
      <button onClick={updateFrequency}>Update Frequency</button>

      <ReactECharts option={chartOptions} />
    </div>
  );
};

export default App;
