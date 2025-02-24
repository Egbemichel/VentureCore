import { useState } from "react";
import { useRouter } from "next/router";
import CustomModal from "@/components/CustomModal";
import Image from "next/image";
import signup from "../app/assets/images/signup.jpg";
import InputField from "@/components/InputField";
import NameIcon from "@/components/NameIcon";
import EmailIcon from "@/components/EmailIcon";
import PassIcon from "@/components/PassIcon";
import CustomButton from "@/components/CustomButton";
import "../styles/globals.css";

export default function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState(""); // Store the redirect URL
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, action: "signup" }),
    });
    const data = await res.json();
    setmodalType(data.success ? "success" : "error");
    setModalMessage(data.message);
    setModalOpen(true);

    if (data.success) {
      setRedirectTo(data.redirectTo); // Save the redirect URL
    }
  };

  const handleModalClose = (isSuccess) => {
    setModalOpen(false);
    if (isSuccess && redirectTo) router.push(redirectTo);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#D9D9D9]">
      <h2 className="text-[40px] text-[#6c63ff] font-bold">
        Create an Account
      </h2>
      <p className="text-[16px] text-gray-600 mb-10">
        Begin An Incredible Journey.
      </p>
      <Image src={signup} width={321} height={243} alt="Create an Account" />
      <InputField
        IconComponent={NameIcon}
        handleChange={handleChange}
        width="296px"
        placeholder="Enter your name"
        type="text"
        name="name"
      />
      <InputField
        IconComponent={EmailIcon}
        handleChange={handleChange}
        width="296px"
        placeholder="Enter your email"
        type="text"
        name="email"
      />
      <InputField
        IconComponent={PassIcon}
        handleChange={handleChange}
        width="296px"
        placeholder="Enter your password"
        type="password"
        name="password"
      />
      <p className="mt-4 text-sm cursor-pointer">
        Already have an account?{" "}
        <span
          className="text-[#6c63ff] cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
      <CustomButton width="266px" onClick={handleSubmit} text="Register" />
      <CustomModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
