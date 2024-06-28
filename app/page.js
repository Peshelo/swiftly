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
      <div className="flex flex-row p-4 border-b shadow-sm justify-between items-center bg-white">
        <nav className="flex flex-row items-center gap-x-4">
          <Link href="#" className="px-2 cursor-pointer hover:scale-105 transform transition-transform duration-300"><Logo /></Link>
        </nav>
        <div className="flex flex-row gap-x-2">
          <Link href="/auth/sign-in" className={buttonVariants({ variant: "outline" }) + " transition-colors duration-300"}>Sign In</Link>
          <ReportCase />
        </div>
      </div>
      <div className="font-sans background bg-gradient-to-b from-green-700 to-green-900 flex flex-col items-center min-h-screen w-full">
        <div>
          <div className="absolute inset-0 bg-gradient-to-t -z-10 from-green-700 to-transparent opacity-75"></div>
          <div className="md:overflow-hidden mt-[100px] mb-[50px]">
            <div className="px-4 py-16">
              <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
                <h1 className="font-bold text-white drop-shadow-lg text-[100px] max-md:text-[50px] leading-tight mb-6">
                  Swiftly App
                </h1>
                <label className="text-gray-200 my-4 text-md">
                  Empowering Customers, Amplifying Voices - Your Direct Line to Local Services.
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
        <div className="w-[1200px] -mb-[200px] max-md:w-screen mx-4 z-50 border-4 rounded-lg my-4 bg-white drop-shadow-xl animate-fadeInUp">
          <Image src="/assets/images/saas2.png" alt="map" width={'1500'} height={'1500'} className="w-full h-full object-cover" />
        </div>
        <div id="services" className="section p-4 pt-[250px] w-full bg-white">
          <div className="container mx-auto px-4">
            <header className="text-center mx-auto mb-12 lg:px-20">
              <h2 className="text-2xl leading-normal mb-2 font-bold text-black">What We Do</h2>
              {/* <HiDatabase size={32} className="mx-auto text-green-500" /> */}
              <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">
                Save time managing customer issues and complaints with real-time tracking and updates.
              </p>
            </header>
            <div className="flex flex-wrap flex-row -mx-4 text-center">
              {[
                { title: "Issue Management", description: "Easily manage and resolve customer issues and complaints.", icon: <HiDatabase size={32} /> },
                { title: "Location Tracking", description: "Pinpoint the exact location of issues on a map for quick resolution.", icon: <HiMap size={32} /> },
                { title: "Real-Time Updates", description: "Get real-time updates on the status of each case as it's being handled.", icon: <HiClock size={32} /> },
                { title: "Case Resolution", description: "Track the progress and completion of cases efficiently.", icon: <HiCheckCircle size={32} /> },
                { title: "Customer Engagement", description: "Enhance customer satisfaction through effective communication.", icon: <HiUserGroup size={32} /> },
                { title: "Data Management", description: "Efficiently handle and analyze data related to customer issues.", icon: <HiDatabase size={32} /> },
              ].map((service, index) => (
                <div key={index} className="flex-shrink rounded-lg px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp">
                  <div className="py-8 px-12 mb-12 bg-background border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-green-600 hover:text-white hover:shadow-lg rounded-lg">
                    <div className="inline-block mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-lg leading-normal mb-2 font-semibold ">{service.title}</h3>
                    <p className="text-gray-500">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
