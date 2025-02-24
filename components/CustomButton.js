import React from "react";

const CustomButton = ({ width, onClick, text, type = "button" }) => {
  return (
    <div className="mt-[62px] flex items-center justify-center">
      <button
        type={type}
        onClick={onClick}
        className={`bg-[#6c63ff] text-black py-2 rounded-[8px] h-[42px] cursor-pointer`}
        style={{ width: width }}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
// This is a reusable input field component that accepts props for width, icon, placeholder, and color. The component is a simple input field with a placeholder and an icon on the right side. The color of the input field and the icon can be customized using the color prop. This component can be used in various forms throughout the application.
