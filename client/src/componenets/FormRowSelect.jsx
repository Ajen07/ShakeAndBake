import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="my-4">
        
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 ">{labelText || name}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="text-center bg-thulian-pink-very-light py-2"
        required
      >
        {list.map((itemValue, index) => {
          return (
            <option className="px-4" value={itemValue} key={index}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
