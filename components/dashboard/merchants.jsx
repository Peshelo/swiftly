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

  const deleteRecord = async (id)=>{
    try{
      await pb.collection('merchant').delete(id);
      await fetchMerchants();
      toast.success("Record has been deleted")
      
    }catch(e){
      toast.error(e.message)
    }
  }
  const search = async ()=>{
    const record = await pb.collection('merchant').getFirstListItem(
      // 'name="asd"',
      `name=${searchParam}`,

    );
    console.log(record)
  }
  useEffect(()=>{ 
    fetchMerchants();
  },[]);
  return (
    <>
    <div className="w-full px-4 flex row items-center gap-x-1">
    <Input type="text" value={searchParam} onChange={(e)=>setSearchParam(e.target.value)} placeholder="Search for merchant..." className="outline-none w-1/2"/>
<Button onClick={()=>search()}><HiOutlineSearch />
</Button>
    </div>
    <table className="text-sm bg-white" aria-label="Merchants Table">
      <thead className="bg-gray-200">
        <tr className="p-2 border-b">
        <th className="pl-4 text-left">Name</th>
        <th className="text-left">Description</th>
        <th className="text-left">City</th>
        <th className="text-left">Address</th>
        <th className="text-left">Website</th>
        <th className="text-left">Phone Number</th>
        <th className="text-left p-1">Is Active</th>
        <th className="pr-4 p-1 text-left">Cases</th>
        <th className="pr-4 p-1"></th>

        <th className="pr-4 p-1"></th>
        </tr>
      </thead>
      <tbody className="px-2">
        {merchants.map(merchant=>(
           <tr className="border-b hover:bg-gray-50 duration-75" key={merchant.id}>

           <td className="pl-4  py-4">{merchant.name}</td>
           <td>{merchant.description.split(50)[0] + '...'}</td>
           <td>{merchant.city}</td>
           <td>{merchant.address.split(50)[0]+'...'}</td>
           <td>{merchant.website}</td>
           <td>{merchant.phoneNumber}</td>
           <td><Badge>{merchant.isActive.toString()}</Badge>
           </td>
           <td className="pr-4">2</td>
           <td>
           <Sheet>
  <SheetTrigger><div className="flex flex-row items-center text-orange-600 gap-x-2"><HiPencil />
  Edit</div></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>__</SheetTitle>
      <EditMerchantForm recordId={merchant.id}/>
    </SheetHeader>
  </SheetContent>
</Sheet>
           </td>
           <td className="pr-4">
            
            <DropdownMenu>
  <DropdownMenuTrigger><HiDotsHorizontal /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem>
    <div className="flex flex-row items-center text-orange-600 gap-x-2"><HiPencil />
  Edit</div>
    </DropdownMenuItem>
    <DropdownMenuItem><div onClick={()=>deleteRecord(merchant.id)} className="flex flex-row items-center text-red-600 gap-x-2"><HiUserRemove />
    Delete</div></DropdownMenuItem>
    <DropdownMenuItem><div className="flex flex-row items-center text-black gap-x-2"><HiBan />
    Disable</div></DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

            </td>

         </tr>
        ))
        }
       
      </tbody>
    </table>
  
    </>
  );
}
