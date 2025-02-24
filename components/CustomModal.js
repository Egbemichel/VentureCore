import { useEffect } from "react";
import CheckIcon from "./CheckIcon";
import RemoveIcon from "./RemoveIcon";

export default function CustomModal({ isOpen, onClose, type, message }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(type === "success");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, type]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-[293px] h-[307] text-center">
        <div
          className={`w-[180px] h-[180px] mx-auto rounded-full flex items-center justify-center ${
            type === "success" ? "bg-[#0DE84B]" : "bg-[#FF0509]"
          }`}
        >
          {type === "success" && <CheckIcon />}
          {type !== "success" && <RemoveIcon />}
        </div>
        <p
          className={`mt-4 font-semibold ${
            type === "success" ? "text-[#0DE84B]" : "text-[#FF0509]"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  ) : null;
}
