/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker  ({ label, selected, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
};
