"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import pb from "@/lib/connection";
import { toast } from 'sonner';
import { useState,useEffect} from "react";
import {Snippet} from "@nextui-org/snippet";
import {Badge} from "@/components/dashboard/badge/badge"
import { image } from "@nextui-org/theme"
import { HiCollection } from "react-icons/hi"

export default function TrackCase({recordId}) {
  const [formData, setFormData] = useState({
    id:'',
    title: '',
    description: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    merchant: null,
    images: null,
    status: '',
    priority: ''
  });


  const fetchCaseDetails = async (id)=>{
    try{
      const record = await pb.collection('cases').getFirstListItem(`id="${id}"`, {
        expand: 'merchant',
    });
      setFormData({
        id: record.id,
        title: record.title,
        description: record.description,
        city: record.city,
        address: record.address,
        latitude: record.latitude,
        longitude: record.longitude,
        merchant: record.merchant,
        status: record.status,
        phoneNumber: record.phoneNumber,
        images: record.images,
        priority: record.priority,
        merchant: record.expand.merchant
      })
      console.log(record);
    }catch(e){
      // toast.error(e.message)
    }
  }
  //Uodate the status of the case
  const cancelCase = async (id)=>{
    if(confirm("Are you sure you want to cancel this case?")){
      try{
        await pb.collection('cases').update(id, {
          status: "Cancelled",
      });
        toast.success("Case status has been updated");
        fetchCaseDetails(id);
      }catch(e){
        toast.error(e.message)
      }
    };
  }
  useEffect(()=>{
    fetchCaseDetails(recordId);
  },[recordId])
  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button>Track Case</Button>
      </DrawerTrigger>
      <DrawerContent className="max-sm:p-2">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="border-b py-2">
            <DrawerTitle className="flex flex-row items-center gap-x-2 my-2">Case Reference: <Snippet color="success">{recordId}</Snippet></DrawerTitle>
            <DrawerDescription>Track the state of your case.</DrawerDescription>
          </DrawerHeader>
          {formData.title ? (
            <div className="pb-0">
            <div className="mt-4">
              <div>
                <Label className="font-semibold text-green-700">Case Title:</Label>
                <p>{formData?.title}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Case Description:</Label>
                <p>{formData?.description}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">City:</Label>
                <p>{formData?.city}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Address:</Label>
                <p>{formData?.address}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Client PhoneNumber:</Label>
                <p>{formData?.phoneNumber}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Status:</Label>
                <div className="p-1 px-2 bg-gray-200 w-fit text-sm rounded-xl">{formData?.status}</div>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Priority:</Label>
                <p status={formData?.priority} className={`bg-${formData?.priority}-500 p-2 w-fit rounded-xl px-4 text-xs`}>
                  {formData?.priority.toUpperCase()}
                </p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Latitude:</Label>
                <p>{formData?.latitude}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Longitude:</Label>
                <p>{formData?.longitude}</p>
              </div>
              <div className="mt-2 text-gray-500 text-sm">
                <Label className="font-semibold text-green-700">Merchant:</Label>
                <p>Name: {formData?.merchant?.name}</p>
                <p>Contact: 0{formData?.merchant?.phoneNumber}</p>

              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Picture:</Label>
                <div className="flex flex-row w-full gap-2">
                  
                {
                  formData?.images?.map((image, index)=>(
                    <a key={index} href={`https://swiftly.pockethost.io/api/files/vc5muu8hvdtzlf1/${formData?.id}/${image}`} target="_blank"  >
                      <img src={`https://swiftly.pockethost.io/api/files/vc5muu8hvdtzlf1/${formData?.id}/${image}`} alt="case" className="w-20 h-20 border hover:border-2 hover:shadow-md duration-75 rounded-md object-cover"/>
                    </a>
                  ))
                }
                </div>
               
              </div>
              <DrawerFooter className="mt-4">
                {formData?.status == 'Cancelled' ? <p className="text-red-500 w-full"><b>NB: </b>This case was cancelled</p> : <Button variant="destructive" onClick={()=>cancelCase(formData?.id)}>I want to cancel my case</Button>}
                <DrawerClose asChild>
                  <Button variant="flat">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
            
          </div>
          ): <p className="flex flex-col h-[200px] w-full p-4 items-center justify-center text-gray-400">
            <HiCollection size={20} className="text-gray-500 my-2"/>
            Case not found</p>}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
