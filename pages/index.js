import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import "../styles/globals.css";
import welcome from "../app/assets/images/welcome.jpg";
import onboarding from "../app/assets/images/onboarding(1).jpg";
import NextIcon from "@/components/NextIcon";

export default function Home() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 0) {
        setStep(1);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else router.push("/signup");
  };

  const getBackgroundColor = () => {
    switch (step) {
      case 0:
        return "bg-[#6C63FF]";
      case 1:
        return "bg-[#D9D9D9]";
      case 2:
        return "bg-[#D9D9D9]";
      default:
        return "bg-[#D9D9D9]";
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${getBackgroundColor()} p-4 overflow-hidden`}
    >
      {step === 0 && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-2xl font-bold"
        >
          VentureCore
        </motion.h1>
      )}

      {step === 1 && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-start"
        >
          <Image
            src={onboarding}
            width={317}
            height={311}
            alt="Collaboration"
          />
          <h2 className="text-[40px] font-bold mt-4">
            Collaborate <br></br> More <br></br> Efficiently
          </h2>
          <p className="text-[16px] text-gray-600">
            Manage projects and work together easily.
          </p>
          <div className="mt-4 flex space-x-2">
            <motion.div className="w-[26px] h-[11px] bg-black rounded-lg scale-110" />
            <motion.div className="w-[26px] h-[11px] bg-white rounded-lg" />
          </div>
          <button
            onClick={handleNext}
            className="fixed bottom-4 right-4 w-[68px] h-[68px] bg-[#1E1E1E] text-white px-4 py-2 rounded-full flex items-center justify-center"
          >
            <NextIcon />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-start"
        >
          <Image src={welcome} width={324} height={324} alt="Track Budgets" />
          <h2 className="text-[40px] font-bold mt-4">
            Work Smarter <br></br> Not Harder
          </h2>
          <p className="text-[16px] text-gray-600">
            Team Work Done Differently.
          </p>
          <div className="mt-4 flex space-x-2">
            <motion.div className="w-[26px] h-[11px] bg-white rounded-lg" />
            <motion.div className="w-[26px] h-[11px] bg-black rounded-lg scale-110" />
          </div>
          <button
            onClick={handleNext}
            className="fixed bottom-4 flex items-center right-4 w-[68px] h-[68px] bg-[#1E1E1E] text-white px-4 py-2 rounded-full justify-center"
          >
            <NextIcon />
          </button>
        </motion.div>
      )}
    </div>
  );
}
