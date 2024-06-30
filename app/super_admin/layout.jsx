"use client"
import Link from "next/link"
import React, { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import pb from "@/lib/connection";
import AdminSideNav from "@/components/dashboard/sidenav";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { IoLogOut } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useLogout from "@/lib/hooks/useLogout";
import { toast } from "sonner";
import { HiLogout } from "react-icons/hi";


export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const [username, setUsername] = useState("");
  const [email,setEmail]= useState("");
  const router = useRouter();

  const logout = () => {
    pb.authStore.clear();
    router.push('/auth/sign-in');
    // pb.authStore.clear();
    // router.refresh()
  }
  const fetchUserDetails = ()=>{
    try{
      const model = pb.authStore.model;
      setUsername(model.username);
      setEmail(model.email);
      console.warn(model)
    }catch(e){
        toast.error(e.message)
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <section className="w-screen h-screen overflow-hidden flex flex-row">
      <div className="flex overflow-hidden shadow-md flex-col bg-slate-900 text-white justify-between p-2 gap-y-4 pb-4 border-l">
        <div className="max-sm:hidden">
        <Link href={'/super_admin'} className="px-2 w-full flex flex-row items-center justify-center my-4"><Logo  /></Link>
        </div>
        <Card className="bg-transparent border-0 border-b border-gray-500 rounded-none py-2 max-sm:justify-center flex flex-row gap-x-2 items-center">
          <Avatar name={username} />
          <div className="max-sm:hidden flex flex-col">
            <h2 className="text-md text-gray-200">{username}</h2>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </Card>
        <AdminSideNav />
        <Button variant={'secondary'} className="w-full flex flex-row justify-start items-center" onClick={()=>logout()}><IoLogOut size={20}/> <p className="max-sm:hidden mx-2" variant="secondary">Logout</p></Button>
      </div>

      <div className="w-full">

        <div className=" h-full bg-gray-50 overflow-y-auto">
        {children}
        </div>
      </div>



    </section>
  )
}