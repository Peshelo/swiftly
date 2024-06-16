
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

export default function SuperAdminMerchants() {

  const refreshParent = ()=>{
    console.log("refreshed")
  }
  return (
    <main className="flex flex-col gap-y-4 px-4 md:gap-x-8 md:px-8 justify-between">
        <div className=" w-full p-4 flex flex-row justify-between items-center">
         <h1 className=" font-bold flex flex-row gap-x-2 items-center">Cases <HiOutlineRefresh  className="text-gray-400 hover:text-gray-600 duration-75"  />
         </h1>
         <Sheet>
  <SheetTrigger><Button className="flex flex-row items-center gap-x-2"><HiOutlinePlus/>New Record</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>__</SheetTitle>
      <AddCaseForm/>
    </SheetHeader>
  </SheetContent>
</Sheet>
        </div>
        
      <MerchantsCases/>
    </main>
  );
}
