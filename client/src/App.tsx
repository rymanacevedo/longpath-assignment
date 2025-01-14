import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import ReactECharts from "echarts-for-react";
import DateTimeSelector from "./components/DateTimeSelector";
import HistoryTable from "./components/HistoryTable";
import { useToast } from "./provider/ToastProvider";

const App = () => {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);
  const [filteredData, setFilteredData] = useState<
    { timestamp: string; value: number }[]
  >([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [frequency, setFrequency] = useState(1000);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { addToast } = useToast();

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("status", (data) => {
      console.log(data);
    });

    newSocket.on("random-number", (data) => {
      console.log("New number received:", data);
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

  function isSocketDefined(socket: Socket | null): socket is Socket {
    return socket !== null;
  }

  const startNumberGeneration = async () => {
    if (isSocketDefined(socket) && socket.connected) {
      socket.emit("start");
      addToast({
        message: "Successfully started number generation",
        type: "success",
      });
    } else {
      addToast({ message: "Failed to start number generation", type: "error" });
    }
  };
  const stopNumberGeneration = async () => {
    if (isSocketDefined(socket) && socket.connected) {
      socket.emit("stop");
      addToast({ message: "Stopped number generation", type: "success" });
    } else {
      addToast({ message: "Failed to stop number generation", type: "error" });
    }
  };
  const updateFrequency = () => {
    axios
      .post("http://localhost:3001/random/frequency", {
        frequency,
      })
      .then(() => {
        addToast({
          message: "Successfully updated number generation amount",
          type: "success",
        });
      })
      .catch((e: Error) => {
        console.error(e);
        addToast({
          message: "Unknown error updating frequency",
          type: "error",
        });
      });
  };
  const chartOptions = {
    xAxis: { type: "category", data: filteredData.map((d) => d.timestamp) },
    yAxis: { type: "value" },
    series: [{ data: filteredData.map((d) => d.value), type: "line" }],
  };

  // for echart bug on initial load
  const echartRef = useRef<any>(null);
  useEffect(() => {
    const handleResize = () => {
      if (echartRef.current) {
        echartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("load", handleResize);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Random Number Generator
        </h1>
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Controls:</h2>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={startNumberGeneration}
            >
              Start
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={stopNumberGeneration}
            >
              Stop
            </button>
            <input
              className="border rounded p-2"
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.currentTarget.value))}
              placeholder="Frequency (ms)"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={updateFrequency}
            >
              Update
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
          {/* Left Panel */}
          <div className="flex-1 flex items-center justify-center">
            <ReactECharts
              ref={echartRef}
              option={chartOptions}
              className="w-full h-80"
            />
          </div>

          {/* Right Panel */}
          <div className="flex-1">
            <DateTimeSelector
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <HistoryTable data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
