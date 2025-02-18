// app/layout.js (or your main .js file)
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from '../context/userContext'; // Adjust the path based on your folder structure

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider> {/* Wrap your children with UserProvider */}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
