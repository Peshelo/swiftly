"use client"
import React, { useState,useEffect } from "react"
import pb from "@/lib/connection";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiBan, HiDotsHorizontal, HiFolderOpen, HiOutlinePlus, HiPencil } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { HiUserRemove } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddMerchantForm from "./addMerchant";
import EditMerchantForm from "./editMerchant";






export default function Merchantstable() {
  const [merchants,setMerchants]=useState([]);
  const [searchParam,setSearchParam] = useState("")

  const fetchMerchants = async ()=>{
    try{
      const list = await pb.collection('merchant').getFullList();
      console.log(list)
      setMerchants(list)
    }catch(e){
        toast.error(e.message)
    }
  }

  const refreshData = ()=>{
    fetchMerchants();
  }
   const deleteRecord = async (id) => {
    // Alert with yes or no with are you sure
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await pb.collection('merchant').delete(id);
        await fetchMerchants();
        toast.success("Record has been deleted");
      } catch (e) {
        toast.error(e.message);
      }
    }
  };
  
  const search = async ()=>{
    if(!searchParam){
      fetchMerchants();
      return;
    }
    try{
      const list = await pb.collection('merchant').getList(1, 50, {
        filter: `name ~ "${searchParam}"`
    });      
    console.log(list)
      setMerchants(list.items)
    }catch(e){
        toast.error(e.message)
    }
    
  }

  pb.collection('merchant').subscribe('*', function (e) {
    console.log(e.action);
    console.log(e.record);
});

  useEffect(()=>{ 
    fetchMerchants();
     // Subscribe to real-time updates
    //  const unsubscribe = pb.collection('merchant').subscribe('*', (e) => {
    //   fetchMerchants();
    // });

    // // Cleanup function to unsubscribe
    // return () => {
    //   unsubscribe();
    // };
  },[]);

 
  return (
    <>
    <div className="w-full px-4 flex row items-center gap-x-1">
    <Input type="text" value={searchParam} onChange={(e)=>setSearchParam(e.target.value)} placeholder="Search for merchant..." className="outline-none w-1/2"/>
<Button onClick={()=>search()}><HiOutlineSearch />
</Button>
    </div>
    <div className="p-4">
            {merchants.length > 0 ? (
                <div className="space-y-4">
                    {merchants.map(merchant => (
                        <div
                            key={merchant.id}
                            className="bg-white rounded-lg shadow-md p-4 border border-gray-300 transition duration-300 hover:shadow-lg hover:bg-gray-50"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <div>
                                        <span className="block text-lg font-semibold">{merchant.name}</span>
                                        <span className="block text-sm text-gray-600">{merchant.description.length > 50 ? merchant.description.substring(0, 50) + '...' : merchant.description}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-gray-600">{merchant.city}</span>
                                        <span className="block text-sm text-gray-600">{merchant.address.length > 50 ? merchant.address.substring(0, 50) + '...' : merchant.address}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-gray-600">{merchant.website}</span>
                                        <span className="block text-sm text-gray-600">{merchant.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <span className={`block text-sm font-semibold py-1 px-2 w-fit rounded-full  ${merchant.isActive ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                            {merchant.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-x-2">
                                    <Sheet>
                                        <SheetTrigger>
                                            <div className="flex flex-row items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                                                <HiPencil />
                                                <span className="ml-2">Edit</span>
                                            </div>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Edit Merchant</SheetTitle>
                                                <EditMerchantForm recordId={merchant.id} />
                                            </SheetHeader>
                                        </SheetContent>
                                    </Sheet>
                                    <div onClick={() => deleteRecord(merchant.id)} className="flex cursor-pointer flex-row items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                                        <HiUserRemove />
                                        <span className="ml-2">Delete</span>
                                    </div>
                                    <div className="flex flex-row items-center cursor-pointer bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
                                        <HiBan />
                                        <span className="ml-2">Disable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4">
                    No records found
                </div>
            )}
        </div>
    </>
  );
}
