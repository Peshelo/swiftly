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

export default function Home() {
  const [recordId, setRecordId] = useState("");
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row p-4 border-b shadow-sm justify-between items-center">
        <nav className="flex flex-row items-center gap-x-4">
          <Logo />
          {/* <ul className="flex flex-row gap-x-2">
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul> */}
        </nav>
        <div className="flex flex-row gap-x-2">
          <Link href="/auth/sign-in" className={buttonVariants({ variant: "outline" })}>Sign In</Link>
          <ReportCase/>
        </div>

      </div>
      <div
        className="font-sans background bg-green-900 flex flex-col items-center min-h-screen w-full"
      >
        <div>
          <div
            className="absolute inset-0 bg-gradient-to-t -z-10 from-green-700 to-transparent opacity-75"
          ></div>

          <div className="md:overflow-hidden mt-[100px] mb-[50px]">
            <div className="px-4 py-16">
              <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
                <h1
                  className="font-bold text-white drop-shadow-lg text-[100px] max-md:text-[50px] leading-tight mb-6"
                >
                  Swiftly App
                </h1>
                <label className="text-gray-200 my-4 text-md"
                >Empowering Customers, Amplifying Voices - Your Direct Line to
                  Local Services.</label>
                <br />
                <div className="flex flex-row items-center gap-x-1 my-4 px-4">
                  <Input type="text" placeholder="Enter Case Reference Code..." onChange={(e)=>setRecordId(e.target.value)}/>
                  {recordId.length > 0 ? <TrackCase  recordId={recordId}/> : <Button onClick={()=>toast.error("Please enter case reference id")}>Report a case</Button>}
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-[1200px] max-md:w-screen mx-4 z-50 border-4 rounded-lg my-4 bg-white drop-shadow-xl"
        >
          <Image src="/assets/images/img2.png" alt="map" width={'1500'} height={'1500'} className="w-full h-full object-cover" />
        </div>
      </div>

     

    </main>
  );
}
