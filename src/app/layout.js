import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lisk Payment Gateway",
  description: "Web3 payment gateway with music production analytics dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} font-inter h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
