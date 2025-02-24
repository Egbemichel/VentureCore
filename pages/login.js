import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import CustomModal from "@/components/CustomModal";
import login from "../app/assets/images/login.jpg";
import InputField from "@/components/InputField";
import EmailIcon from "@/components/EmailIcon";
import PassIcon from "@/components/PassIcon";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import "../styles/globals.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setModalType("error");
      setModalMessage("Invalid email or password!");
      setModalOpen(true);
    } else {
      // Fetch user session to determine role-based redirection
      const userSession = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      let dashboard = "/dashboard/non-member"; // Default non-member dashboard
      if (userSession?.user?.role === "admin") {
        dashboard = "/dashboard/admin";
      } else if (userSession?.user?.role === "member") {
        dashboard = "/dashboard/member";
      }

      setModalType("success");
      setModalMessage("Login successful!");
      setModalOpen(true);

      setTimeout(() => {
        router.push(dashboard); // Redirect to role-based dashboard
      }, 2000); // Delay for modal effect
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#D9D9D9]">
      <h2 className="text-[40px] text-[#6c63ff] font-bold">Login</h2>
      <p className="text-[16px] text-gray-600 mb-10">
        Continue where you left off.
      </p>
      <Image src={login} width={327} height={240} alt="Login" />

      <form onSubmit={handleSubmit} className="max-w-sm">
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
        <CustomButton width="266px" type="submit" text="Login" />
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <span
          className="text-[#6c63ff] cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Register
        </span>
      </p>

      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
