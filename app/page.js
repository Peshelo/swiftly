"use client"
import ReportCase from "@/components/dashboard/reportCase";
import TrackCase from "@/components/dashboard/trackCase";
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import Footer from "@/components/dashboard/footer";
import { HiDatabase, HiMap, HiClock, HiCheckCircle, HiUserGroup } from "react-icons/hi";

export default function Home() {
  const [recordId, setRecordId] = useState("");
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row p-4 border-b shadow-md justify-between items-center top-0 sticky z-50 bg-white">
        <nav className="flex flex-row items-center gap-x-4">
          <Link href="#" className="px-2 cursor-pointer hover:scale-105 transform transition-transform duration-300"><Logo /></Link>
        </nav>
        <div className="flex flex-row gap-x-2">
          <Link href="/auth/sign-in" className={buttonVariants({ variant: "outline" }) + " transition-colors duration-300"}>Sign In</Link>
          <ReportCase />
        </div>
      </div>
      <div className="font-sans background bg-gradient-to-b from-black to-blue-900 flex flex-col items-center min-h-screen w-full">
        <div>
          <div className="absolute inset-0 bg-gradient-to-t -z-10 from-black to-transparent opacity-75"></div>
          <div className="md:overflow-hidden mt-[100px] mb-[50px]">
            <div className="px-4 py-16">
              <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
                <h1 className="font-bold text-white drop-shadow-lg text-[50px] max-md:text-[40px] leading-tight mb-6">
                  ZRP EMERGENCY PORTAL
                </h1>
                <label className="text-gray-200 my-4 text-md">
                  Empowering Customers, Amplifying Voices - Your Direct Line to ZRP.
                </label>
                <br />
                <div className="flex flex-row items-center gap-x-1 my-4 px-4">
                  <Input
                    type="text"
                    placeholder="Enter Case Reference Code..."
                    onChange={(e) => setRecordId(e.target.value)}
                    className="hover:shadow-md focus:shadow-lg transition-shadow duration-300"
                  />
                  {recordId.length > 0 ? (
                    <TrackCase recordId={recordId} />
                  ) : (
                    <Button onClick={() => toast.error("Please enter case reference id")}>Track Case</Button>
                  )}
                </div>
                <div className="text-center border-t mt-6 border-green-100/15 p-4 mx-6 text-white">
                  <h3 className="text-lg mb-3 text-gray-100">Download our app </h3>
                  <div className="flex justify-center my-4">
                    <div className="flex bg-white text-black duration-75 items-center border hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg px-4 py-2 w-52 mx-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                      <div className="text-left ml-3">
                        <p className="text-xs text-gray-500">Download on </p>
                        <p className="text-sm md:text-base"> Google Play Store </p>
                      </div>
                    </div>
                    <div className="flex bg-white text-black duration-75 items-center border hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg px-4 py-2 w-44 mx-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                      <div className="text-left ml-3">
                        <p className="text-xs text-gray-500">Download on </p>
                        <p className="text-sm md:text-base"> Apple Store </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
