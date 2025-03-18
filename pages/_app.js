// pages/_app.js
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { ZIndexProvider } from "@/context/ZIndexContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const noNavbarPages = ["/", "/signup", "/login"]; // List of pages without navbar
  const showNavbar = !noNavbarPages.includes(router.pathname);

  const getBackgroundColor = () => {
    const paths = [
      "/dashboard/add-task",
      "/dashboard/modify-project",
      "/dashboard/manage-team",
      "/dashboard/post",
      "/dashboard/upload-file-leader",
      "/dashboard/view-tasks",
      "/dashboard/update-task",
      "/dashboard/upload-file-member",
    ];
    if (router.pathname === paths[0]) {
      return "bg-[#3b82f6]";
    } else if (router.pathname === paths[1]) {
      return "bg-[#22c55e]";
    } else if (router.pathname === paths[2]) {
      return "bg-[#eab308]";
    } else if (router.pathname === paths[3]) {
      return "bg-[#a855f7]";
    } else if (router.pathname === paths[4]) {
      return "bg-[#ef4444]";
    } else if (router.pathname === paths[5]) {
      return "bg-[#6b7280]";
    } else if (router.pathname === paths[6]) {
      return "bg-[#f97316]";
    } else if (router.pathname === paths[7]) {
      return "bg-[#ef4444]";
    } else return "bg-[#6c63ff]";
  };
  return (
    <SessionProvider session={pageProps.session}>
      <ZIndexProvider>
        {showNavbar && <Navbar bgColor={getBackgroundColor()} />}
        <Component {...pageProps} />
      </ZIndexProvider>
    </SessionProvider>
  );
}

export default MyApp;
