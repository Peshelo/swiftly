import AddCaseForm from "@/components/dashboard/addCase";
import AddMerchantForm from "@/components/dashboard/addMerchant";
import MerchantsCases from "@/components/dashboard/merchantCases";
import MerchantsTable from "@/components/dashboard/merchants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineRefresh } from "react-icons/hi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function SuperAdminMerchants() {
  const refreshParent = () => {
    console.log("refreshed")
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Merchant Management</h1>
          <p className="text-muted-foreground">
            Manage all merchants and their cases in one place
          </p>
        </div>

        {/* Stats and Actions Card */}
        <Card className="shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl">Merchant Overview</CardTitle>
              <CardDescription>
                View and manage all merchant accounts
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                // onClick={refreshParent}
                className="flex items-center gap-x-2"
              >
                <HiOutlineRefresh className="h-4 w-4" />
                Refresh
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="flex items-center gap-x-2">
                    <HiOutlinePlus className="h-4 w-4" />
                    New Record
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Create New Case</SheetTitle>
                    <SheetDescription>
                      Add a new case to the system
                    </SheetDescription>
                  </SheetHeader>
                  <AddCaseForm />
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search merchants..."
                  className="pl-8"
                />
              </div>
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Merchants & Cases</CardTitle>
            <CardDescription>
              Comprehensive view of all merchants and their associated cases
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="cases" className="w-full">
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                  <TabsTrigger 
                    value="cases" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                  >
                    Cases
                  </TabsTrigger>
                  <TabsTrigger 
                    value="merchants" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                  >
                    Merchants
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="cases" className="m-0 p-6">
                <MerchantsCases />
              </TabsContent>
              
              <TabsContent value="merchants" className="m-0 p-6">
                <MerchantsTable />
              </TabsContent>
              
              <TabsContent value="analytics" className="m-0 p-6">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Analytics dashboard coming soon...
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}