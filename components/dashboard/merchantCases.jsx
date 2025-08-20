"use client";
import React, { useState, useEffect } from "react";
import pb from "@/lib/connection";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HiOutlineSearch, 
  HiPencil, 
  HiEye, 
  HiMap,
  HiTrash
} from "react-icons/hi";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EditCaseForm from "./editCase";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  IoCall, 
  IoLocationOutline,
  IoCalendarOutline,
  IoTimeOutline
} from "react-icons/io5";
import { FaDirections, FaIdCard } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiFilter3Line } from "react-icons/ri";

export default function MerchantsCases() {
  const [merchants, setMerchants] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const fetchMerchants = async () => {
    try {
      const list = await pb.collection('merchant').getFullList({
        sort: '-created',
      });
      setMerchants(list);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      const list = await pb.collection('cases').getFullList({
        sort: '-created',
        expand: 'merchant'
      });
      setCases(list);
      setFilteredCases(list);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    if (confirm("Are you sure you want to delete this case?")) {
      try {
        await pb.collection('cases').delete(id);
        await fetchCases();
        toast.success("Case has been deleted");
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  const handleSearch = () => {
    if (!searchParam) {
      setFilteredCases(cases);
      return;
    }
    
    const filtered = cases.filter(caseItem => 
      caseItem.id.toLowerCase().includes(searchParam.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchParam.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchParam.toLowerCase()) ||
      caseItem.address.toLowerCase().includes(searchParam.toLowerCase())
    );
    
    setFilteredCases(filtered);
  };

  const applyFilters = () => {
    let result = cases;
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(caseItem => caseItem.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter(caseItem => caseItem.priority === priorityFilter);
    }
    
    // Apply search filter
    if (searchParam) {
      result = result.filter(caseItem => 
        caseItem.id.toLowerCase().includes(searchParam.toLowerCase()) ||
        caseItem.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        caseItem.description.toLowerCase().includes(searchParam.toLowerCase()) ||
        caseItem.address.toLowerCase().includes(searchParam.toLowerCase())
      );
    }
    
    setFilteredCases(result);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, priorityFilter, cases, searchParam]);

  useEffect(() => {
    const unsubscribe = pb.collection('cases').subscribe('*', (e) => {
      fetchCases();
    });
    
    fetchMerchants();
    fetchCases();
    
    return () => {
      // unsubscribe();
    };
  }, []);

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'default';
      case 'ongoing': return 'secondary';
      case 'resolved': return 'success';
      case 'closed': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'outline';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Case Management</CardTitle>
              <CardDescription>
                View and manage all cases in the system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchCases}>
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                placeholder="Search cases by ID, title, or address..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Cases</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filteredCases.length} {filteredCases.length === 1 ? 'case' : 'cases'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="divide-y">
              {filteredCases.map((mycase) => (
                <div key={mycase.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Case Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="font-semibold text-lg">{mycase.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant={getStatusBadgeVariant(mycase.status)}>
                            {mycase.status}
                          </Badge>
                          <Badge variant={getPriorityBadgeVariant(mycase.priority)}>
                            {mycase.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground line-clamp-2">
                        {mycase.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IoLocationOutline className="h-4 w-4" />
                            <span>{mycase.address}, {mycase.city}</span>
                          </div>
                          {mycase?.phoneNumber && (
                            <a 
                              href={`tel:${mycase.phoneNumber}`}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <IoCall className="h-4 w-4" />
                              {mycase.phoneNumber}
                            </a>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IoCalendarOutline className="h-4 w-4" />
                            <span>{formatDate(mycase.created)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IoTimeOutline className="h-4 w-4" />
                            <span>{formatTime(mycase.created)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FaIdCard className="h-3 w-3" />
                        <span className="font-mono">{mycase.id}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 justify-end lg:justify-start">
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${mycase.latitude},${mycase.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaDirections className="h-4 w-4" />
                            Directions
                          </a>
                        </Button>
                        
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <a 
                            href={`/merchant/map?lat=${mycase.latitude}&long=${mycase.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <HiMap className="h-4 w-4" />
                            View Map
                          </a>
                        </Button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <Button asChild size="sm" className="gap-2">
                          <a href={`/case?caseId=${mycase.id}`}>
                            <HiEye className="h-4 w-4" />
                            View Case
                          </a>
                        </Button>
                        
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="secondary" size="sm" className="gap-2">
                              <HiPencil className="h-4 w-4" />
                              Edit
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md">
                            <SheetHeader className="mb-6">
                              <SheetTitle>Edit Case</SheetTitle>
                              <SheetDescription>
                                Update the case details below
                              </SheetDescription>
                            </SheetHeader>
                            <EditCaseForm recordId={mycase.id} />
                          </SheetContent>
                        </Sheet>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => deleteRecord(mycase.id)}
                        >
                          <HiTrash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                No cases found matching your criteria
              </div>
              <Button variant="outline" onClick={() => {
                setSearchParam("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}>
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}