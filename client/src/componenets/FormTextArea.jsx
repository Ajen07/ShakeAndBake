import React from "react";

const FormTextArea = ({name, placeholder, labelText, value, handleChange}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText || name}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg bg-thulian-pink-very-light focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        cols="30"
        rows="20"
      ></textarea>
    </div>
  );
};

export default FormTextArea;
