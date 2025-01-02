import React, { useState } from 'react';

interface HistoryTableProps {
  data: { timestamp: string; value: number }[];
}

const HistoryTable = ({ data }: HistoryTableProps) => {
  const [sortBy, setSortBy] = useState<'timestamp' | 'value'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  const sortedData = [...data].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortBy === 'timestamp') {
      return direction * (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
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
      <h2>History (Last 20 Numbers)</h2>

      {/* Filters */}
      <div>
          Min Value:
          <input
            type="number"
            value={minValue ?? ''}
            onChange={(e) => setMinValue(e.target.value ? parseFloat(e.target.value) : null)}
            style={{ marginLeft: '5px', marginRight: '10px' }}
          />
          Max Value:
          <input
            type="number"
            value={maxValue ?? ''}
            onChange={(e) => setMaxValue(e.target.value ? parseFloat(e.target.value) : null)}
            style={{ marginLeft: '5px' }}
          />
      </div>

      {/* Table */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => {
                  setSortBy('timestamp');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
              >
                Timestamp {sortBy === 'timestamp' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => {
                  setSortBy('value');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
              >
                Value {sortBy === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(-20).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.timestamp}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default HistoryTable;
