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
import MerchantSideNav from "@/components/dashboard/merchantSideNav";
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
import {
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HiDocumentDuplicate, HiLocationMarker, HiViewGrid } from "react-icons/hi"
import LogoWhite from "@/components/ui/logoWhite";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const router = useRouter()
  const currentPath = router.pathname;

  const logout = () => {
    pb.authStore.clear();
    router.push('/auth/sign-in');
    // pb.authStore.clear();
    // router.refresh()
  }

  return (
    <section className="w-screen h-screen overflow-hidden flex flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-slate-900 px-4 md:px-6">
      <nav className="hidden text-white dark:text-slate-900 flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center border-r border-gray-500 pr-4 gap-2 text-lg font-semibold md:text-base"
        >
          <Logo/>
          <span className="sr-only">Swiftly</span>
        </Link>
        <Link href="/merchant" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant' ? 'bg-green-600' : 'hover:bg-green-600'}`}><HiViewGrid size={20} />Dashboard</Link>
            <Link href="/merchant/cases" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant/cases' ? 'bg-green-600' : 'hover:bg-green-600'}`}><HiDocumentDuplicate size={20} />Cases</Link>
            <Link href="/merchant/map" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant/map' ? 'bg-green-600' : 'hover:bg-green-600'}`}><HiLocationMarker size={20} />Map</Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
          <Link href="/merchant" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant' ? 'bg-green-600' : 'hover:bg-gray-100'}`}><HiViewGrid size={20} />Dashboard</Link>
            <Link href="/merchant/cases" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant/cases' ? 'bg-green-600' : 'hover:bg-gray-100'}`}><HiDocumentDuplicate size={20} />Cases</Link>
            <Link href="/merchant/map" className={`flex flex-row w-full items-center gap-x-1 py-2 p-2 rounded-md transition-all duration-300 ${currentPath === '/merchant/map' ? 'bg-green-600' : 'hover:bg-gray-100'}`}><HiLocationMarker size={20} />Map</Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
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
    </header>
      
        <div className=" w-full h-full bg-gray-50 overflow-y-auto">
        {children}
        </div>

    </section>
  )
}
