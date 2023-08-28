import React from "react";

const FormRow = ({
  type,
  name,
  placeholder,
  labelText,
  value,
  handleChange,
}) => {
  return (
    <div className="my-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg bg-thulian-pink-very-light focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormRow;
