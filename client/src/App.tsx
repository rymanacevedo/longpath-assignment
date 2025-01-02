import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import ReactECharts from 'echarts-for-react';
import DateTimeSelector from './components/DateTimeSelector';
import HistoryTable from './components/HistoryTable';

const App = () => {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);
  const [filteredData, setFilteredData] = useState<{ timestamp: string; value: number }[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [frequency, setFrequency] = useState(1000);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((d) => {
      const date = new Date(d.timestamp);
      return date >= startDate && date <= endDate;
    });

    setFilteredData(filtered);
  }, [startDate, endDate, data]);

  const startNumberGeneration = async () => {
    if (!socket) {
      return;
    }
    socket.emit('start');
  };

  const stopNumberGeneration = async () => {
    if (!socket) {
      return;
    }
    socket.emit('stop');
  };

  const updateFrequency = async () => {
    await axios.post('http://localhost:3001/random/frequency', {
      frequency,
    });
  };

  const chartOptions = {
    xAxis: { type: 'category', data: filteredData.map((d) => d.timestamp) },
    yAxis: { type: 'value' },
    series: [{ data: filteredData.map((d) => d.value), type: 'line' }],
  };

  return (
    <div>
      <h1>Random Number Generator</h1>
      <button onClick={startNumberGeneration}>Start</button>
      <button onClick={stopNumberGeneration}>Stop</button>

      <input
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
        id="updateFrequency"
        type="number"
      />
      <button onClick={updateFrequency}>Update Frequency</button>

     
      <DateTimeSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <ReactECharts option={chartOptions} />
      <HistoryTable data={filteredData} />
    </div>
  );
};

export default App;
