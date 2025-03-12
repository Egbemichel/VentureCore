// pages/_app.js
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { ZIndexProvider } from "@/context/ZIndexContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isZIndexReduced, setIsZIndexReduced] = useState(false);
  const noNavbarPages = ["/", "/signup", "/login"]; // List of pages without navbar
  const showNavbar = !noNavbarPages.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>
      <ZIndexProvider>
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
      </ZIndexProvider>
    </SessionProvider>
  );
}

export default MyApp;
