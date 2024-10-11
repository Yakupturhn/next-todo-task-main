import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Todo App With Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          position="top-right"
        />
      </body>
    </html>
  );
}
