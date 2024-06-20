"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";
import pb from "@/lib/connection";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Activity, Check, CircleUser, CreditCard, DollarSign, Users } from "lucide-react";
import { NotificationCard } from "@/components/dashboard/notification";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState,useEffect } from 'react';
import { toast } from "sonner";


export default function SuperAdminDashboard() {
  const [totalCases, setTotalCases] = useState([]);
  const [totalOpenCases, setOpenCases] = useState([]);
  const [totalOngoingCases, setOngoingCases] = useState([]);
  const [totalResolvedCases, setResolvedCases] = useState([]);

  const fetchStatistics = async ()=>{
    let cases =[];
    let openCases =[];
    let ongoingCases = [];
    let resolvedCases = [];

    try{
      cases = await pb.collection('cases').getFullList({
        sort: '-created',
    });
      openCases = (await pb.collection('cases').getList(1,50,{filter:'status="Open"'})).items;
      ongoingCases = (await pb.collection('cases').getList(1,50,{filter:'status="Ongoing"'})).items;
      resolvedCases = (await pb.collection('cases').getList(1,50,{filter:'status="Resolved"'})).items;

    }catch(e){
      toast.error(e.message)
    }
    console.log(cases)
    console.log(openCases)
    console.log(ongoingCases)
    console.log(resolvedCases)
    setTotalCases(cases);
    setOpenCases(openCases);
    setOngoingCases(ongoingCases);
    setResolvedCases(resolvedCases);
  }

  useEffect(() => {
    fetchStatistics();
  }, []);
  const logout = () => {
    pb.authStore.clear();
    router.push('/auth/sign-in');
    // pb.authStore.clear();
    // router.refresh()
  }
  return (
    <main className="flex flex-col gap-y-4 justify-between">
        <div className="bg-slate-900 border-l border-b shadow-md top-0 sticky z-10 w-full p-4 flex flex-row justify-between items-center">
          <Input type="text" placeholder="Search..." className="w-fit max-sm:hidden" />
          <div className="hidden max-sm:block">
        <Logo  />
        </div>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/merchant/settings" className="w-full h-full">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      <h1 className="px-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 px-4 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cases
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCases?.length}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Cases
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpenCases?.length}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Cases</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOngoingCases?.length}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResolvedCases?.length}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-6 gap-x-4 max-sm:gap-y-2 px-4 w-full">
        <div className="col-span-4 max-sm:col-span-6 bg-slate-900 border rounded-sm h-[500px] w-full">

        </div>
 <NotificationCard/>
      </div>
    </main>
  );
}
