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

export default function TrackCase({recordId}) {
  const [formData, setFormData] = useState({
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
      const record = await pb.collection('cases').getOne(id);
      setFormData({
        title: record.title,
        description: record.description,
        city: record.city,
        address: record.address,
        latitude: record.latitude,
        longitude: record.longitude,
        merchant: record.merchant,
        status: record.status,
        images: record.images,
        priority: record.priority
      })
    }catch(e){
      toast.error(e.message)
    }
  }
  useEffect(()=>{
    fetchCaseDetails(recordId);
  },[])
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
                <Label className="font-semibold text-green-700">Status:</Label>
                {/* <Badge status={formData?.status}/> */}
                <p>{formData?.status}</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Status:</Label>
                <p status={formData?.priority} className={`bg-${formData?.priority}-500 p-2 w-fit text-white rounded-sm text-xs`}>
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
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Merchant:</Label>
                <p>-</p>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-green-700">Picture:</Label>
                <div className="flex flex-col gap-y-1">
                  
                {
                  formData?.images?.map((image, index)=>(
                    <a key={index} href={`https://swiftly.pockethost.io/api/files/vc5muu8hvdtzlf1/50yj7a7wqzzkarp/${image}`} target="_blank"></a>
                  ))
                }
                </div>
               
              </div>
              <DrawerFooter className="mt-4">
                <Button variant="destructive">Close Case</Button>
                <DrawerClose asChild>
                  <Button variant="flat">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
