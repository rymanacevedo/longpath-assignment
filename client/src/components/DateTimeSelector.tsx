import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const DateTimeSelector = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <DatePicker
          className="mt-1 block w-full border rounded-md shadow-sm"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date:
        </label>
        <DatePicker
          className="mt-1 block w-full border rounded shadow-sm"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
    </div>
  );
};

export default DateTimeSelector;
