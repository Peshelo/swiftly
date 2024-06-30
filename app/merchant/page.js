"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { useState,useEffect } from 'react';
import { toast } from "sonner"
import pb from "@/lib/connection";
import { Snippet } from "@nextui-org/react"
import { HiMap } from "react-icons/hi"




export default function MerchantDashboard() {
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

  return (
    <div className="flex min-h-screen w-full flex-col">

    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
              Total number of cases
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
              Total number of open cases
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
              Total number of ongoing cases
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
              Total number of resolved cases
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="grid gap-2">
              <CardTitle>Ongoing Cases</CardTitle>
              <CardDescription>
                A list of all ongoing cases
              </CardDescription>
            </div>
            <div className="flex flex-row items-center w-fit gap-x-2">
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/merchant/cases">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm" variant={'secondary'} className="ml-auto gap-1">
              <Link href="/merchant/map">
              <HiMap className="h-4 w-4" />
                Open Map
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            </div>
           
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case</TableHead>
                  <TableHead className="">
                    Address
                  </TableHead>
                  <TableHead className="">
                    Status
                  </TableHead>
                  <TableHead className="">
                    Case Id
                  </TableHead>
                  <TableHead className="">
                    Priority
                  </TableHead>
                  {/* <TableHead className="">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {totalOngoingCases.map(mycase=>(
    <TableRow key={mycase.id} >
    <TableCell>
      <div className="font-medium">{mycase?.title}</div>
      <div className="hidden text-sm text-muted-foreground md:inline">
        {mycase?.description}
      </div>
    </TableCell>
    <TableCell className="">
      {mycase?.address}
    </TableCell>
    <TableCell className="">
      <Badge className={`text-xs bg-${mycase?.priority}-200 text-${mycase?.priority}-700`} variant="outline" >
        {mycase?.status}
      </Badge>
    </TableCell>
    <TableCell>
    <Snippet color="success" className="bg-white">{mycase?.id}</Snippet>
    </TableCell>
    <TableCell>
      <div className={`bg-${mycase?.priority}-500 w-4 h-4`}></div>
    </TableCell>
    {/* <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
      {mycase.createdDate}
    </TableCell>
    <TableCell className="text-right">$250.00</TableCell> */}
  </TableRow>
                ))}
            


              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
          </CardHeader>
          <CardContent className="grid h-[400px] overflow-y-auto mb-4">
            {totalCases.map(mycase=>(
                <div key={mycase.id} className="flex items-center border-b gap-4 p-2 py-4 rounded-md hover:bg-gray-100 duration-75">
                <Avatar name="AN" />
    
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {mycase?.title.toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mycase?.address}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <div className={`text-${mycase?.priority}-500 p-2 rounded-md text-xs`}>{mycase?.status}</div>
                  </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
  );
}
