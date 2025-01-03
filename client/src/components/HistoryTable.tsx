import React, { useState } from "react";

interface HistoryTableProps {
  data: { timestamp: string; value: number }[];
}

const HistoryTable = ({ data }: HistoryTableProps) => {
  const [sortBy, setSortBy] = useState<"timestamp" | "value">("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  const sortedData = [...data].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1;
    if (sortBy === "timestamp") {
      return (
        direction *
        (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      );
    }
    return direction * (a.value - b.value);
  });

  const filteredData = sortedData.filter((item) => {
    if (minValue !== null && item.value < minValue) return false;
    if (maxValue !== null && item.value > maxValue) return false;
    return true;
  });

  return (
    <>
      <h2 className={"text-2xl font-bold mb-4 mt-4"}>
        History (Last 20 Numbers)
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Value:
          </label>
          <input
            type="number"
            className="border rounded"
            id="minValue"
            value={minValue ?? ""}
            onChange={(e) =>
              setMinValue(e.target.value ? parseFloat(e.target.value) : null)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Value:
          </label>
          <input
            id="maxValue"
            className="border rounded"
            type="number"
            value={maxValue ?? ""}
            onChange={(e) =>
              setMaxValue(
                e.currentTarget.value
                  ? parseFloat(e.currentTarget.value)
                  : null,
              )
            }
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  setSortBy("timestamp");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Timestamp
                {sortBy === "timestamp" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  setSortBy("value");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Value
                {sortBy === "value" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.slice(-20).map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryTable;
