import { Manrope } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "@/components/ui/sonner"
const inter = Manrope({subsets: ['latin']});

export const metadata = {
  title: "Switly App",
  description: "Fast service for your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextUIProvider>
      {children}    </NextUIProvider>
      <Toaster />
        </body>
    </html>
  );
}
