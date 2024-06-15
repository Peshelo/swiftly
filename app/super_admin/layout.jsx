"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import pb from "@/lib/connection";
import AdminSideNav from "@/components/dashboard/sidenav";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const router = useRouter()
  const handleClick = () => {
    pb.authStore.clear();
    router.push('/auth/login');
    // pb.authStore.clear();
    // router.refresh()
  }

  return (
    <section className="w-screen h-screen overflow-hidden flex flex-row">
      <div className="flex overflow-hidden flex-col bg-white justify-between p-2 gap-y-4 pb-4 border border-l">
        <Logo />
        <Card className="flex flex-row gap-x-2 p-1 items-center">
          <Avatar name={pb.authStore.model.username} />
          <div className="flex flex-col">
            <h2 className="text-md text-gray-600">{pb.authStore.model.username}</h2>
            <p className="text-xs text-gray-400">{pb.authStore.model.email}</p>
          </div>
        </Card>
        <AdminSideNav />
        <Button>Logout</Button>
      </div>

      <div className="w-full">
        <div className=" bg-white border-b shadow-sm top-0 sticky z-10 w-full p-4 flex flex-row justify-between items-center">
          <Input type="text" placeholder="Search..." className="w-fit" />
          <Popover className="mx-4">
            <PopoverTrigger>            
              <Avatar name={pb.authStore.model.username} />
            </PopoverTrigger>
            <PopoverContent className="gap-y-2 border-separate">
              <p>Settings</p>
              <Button>Logout</Button>
            </PopoverContent>
          </Popover>

        </div>
        <div className=" h-full overflow-y-auto">
        {children}
        </div>
      </div>



    </section>
  )
}