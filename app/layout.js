import "../styles/globals.css";

export const metadata = {
  title: "VentureCore",
  description: "Tool for ultimate team collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
