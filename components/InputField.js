import React from "react";

const InputField = ({
  IconComponent,
  handleChange,
  width,
  placeholder,
  type,
  name,
}) => {
  return (
    <div className="relative flex items-center">
      <input
        name={name}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex justify-center w-full py-2 px-4 pr-10 rounded border focus:outline-none"
        style={{
          color: "gray",
          textAlign: "left",
          height: "46px",
          borderRadius: "12px",
          width: width,
          marginTop: "26px",
        }}
      />
      <div className="mt-5 absolute right-3 flex items-center justify-center">
        <IconComponent />
      </div>
    </div>
  );
};

export default InputField;
