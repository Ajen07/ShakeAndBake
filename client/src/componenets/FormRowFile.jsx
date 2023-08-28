import React from "react";

const FormRowFile = ({type, name, labelText, value, handleChange}) => {
  return (
    <div className="my-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText || name}
      </label>
      <input type={type}  name={name}  onChange={handleChange} accept="image/*" />
    </div>
  );
};

export default FormRowFile;
