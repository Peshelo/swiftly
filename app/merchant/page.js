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
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  MoreHorizontal
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
import { useState, useEffect } from 'react';
import { toast } from "sonner"
import pb from "@/lib/connection";
import { Avatar, Snippet } from "@nextui-org/react"
import { HiMap } from "react-icons/hi"
import { Progress } from "@/components/ui/progress"
import { AvatarFallback } from "@/components/ui/avatar"

export default function MerchantDashboard() {
  const [totalCases, setTotalCases] = useState([]);
  const [totalOpenCases, setOpenCases] = useState([]);
  const [totalOngoingCases, setOngoingCases] = useState([]);
  const [totalResolvedCases, setResolvedCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatistics = async () => {
    setIsLoading(true);
    let cases = [];
    let openCases = [];
    let ongoingCases = [];
    let resolvedCases = [];

    try {
      cases = await pb.collection('cases').getFullList({
        sort: '-created',
      });
      openCases = (await pb.collection('cases').getList(1, 50, { filter: 'status="Open"' })).items;
      ongoingCases = (await pb.collection('cases').getList(1, 50, { filter: 'status="Ongoing"' })).items;
      resolvedCases = (await pb.collection('cases').getList(1, 50, { filter: 'status="Resolved"' })).items;

    } catch (e) {
      toast.error(e.message)
    }
    
    setTotalCases(cases);
    setOpenCases(openCases);
    setOngoingCases(ongoingCases);
    setResolvedCases(resolvedCases);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchStatistics();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'Ongoing': return <Clock className="h-4 w-4 mr-1" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4 mr-1" />;
      default: return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Cases
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground bg-blue-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800">{totalCases?.length}</div>
                    <p className="text-xs text-muted-foreground">
                      All cases in the system
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Open Cases
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground bg-orange-100 p-2 rounded-full">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800">{totalOpenCases?.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Cases awaiting action
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Ongoing Cases
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800">{totalOngoingCases?.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Cases in progress
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Resolved Cases
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800">{totalResolvedCases?.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Successfully resolved
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2 shadow-sm border-0">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="grid gap-1">
                  <CardTitle className="text-lg font-semibold">Ongoing Cases</CardTitle>
                  <CardDescription>
                    Active cases that require attention
                  </CardDescription>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button asChild size="sm" variant="outline" className="gap-1 h-9">
                    <Link href="/merchant/map-view">
                      <HiMap className="h-4 w-4" />
                      Map View
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="gap-1 h-9">
                    <Link href="/merchant/cases">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="h-10">Case</TableHead>
                        <TableHead className="h-10">Location</TableHead>
                        <TableHead className="h-10">Status</TableHead>
                        <TableHead className="h-10">Priority</TableHead>
                        <TableHead className="h-10 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={5}>
                              <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : totalOngoingCases.length > 0 ? (
                        totalOngoingCases.map(mycase => (
                          <TableRow key={mycase.id} className="border-b hover:bg-gray-50 transition-colors">
                            <TableCell className="py-3">
                              <div className="font-medium text-sm">{mycase?.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {mycase?.description}
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center text-sm">
                                <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="line-clamp-1">{mycase?.address}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <Badge variant="outline" className="flex items-center w-fit text-xs">
                                {getStatusIcon(mycase?.status)}
                                {mycase?.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-3">
                              <Badge className={`text-xs ${getPriorityColor(mycase?.priority)}`}>
                                {mycase?.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-3 text-right">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/merchant/cases/${mycase.id}`}>
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <FileText className="h-8 w-8 mb-2 opacity-40" />
                              <p>No ongoing cases found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Cases</CardTitle>
                <CardDescription>Latest cases added to the system</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center p-4 border-b">
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full mr-3"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  ) : totalCases.length > 0 ? (
                    totalCases.slice(0, 8).map(mycase => (
                      <div key={mycase.id} className="flex items-center p-4 border-b hover:bg-gray-50 transition-colors">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {mycase?.title?.charAt(0) || 'C'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {mycase?.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {mycase?.address}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(mycase?.priority)}`}
                          >
                            {mycase?.priority}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-muted-foreground">
                      <FileText className="h-8 w-8 mb-2 opacity-40" />
                      <p className="text-sm">No cases found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}