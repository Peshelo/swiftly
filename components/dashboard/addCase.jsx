"use client"
import { Input } from "@/components/ui/input"
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import pb from "@/lib/connection";
import { toast } from 'sonner';
import { useState,useEffect} from "react";
import { Textarea } from "@nextui-org/input";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function AddCaseForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    merchant: pb.authStore.model,
    status: 'Open'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const fetchCaseDetails = async ()=>{
  //   try{
  //     const record = await pb.collection('cases').getOne(recordId);
  //     setFormData({
  //       title: record.title,
  //       description: record.description,
  //       city: record.city,
  //       address: record.address,
  //       latitude: record.latitude,
  //       longitude: record.longitude,
  //       merchant: record.merchant,
  //       status: record.status
  //     })
  //   }catch(e){
  //     toast.error(e.message)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let merchantId = await pb.authStore.model.id;
      // setFormData((prevData) => ({
      //   ...prevData,
      //   'merchant':merchantId
      // }));
      console.log(formData)
        let record = await pb.collection('cases').create(formData);
        toast.success("Case created successfully");
        console.log(record);
        
    }catch(e){
        toast.error(e.message)
    }
    console.log(formData);
  };
useEffect(()=>{
  // fetchCaseDetails();
},[])

  return (
    <div className=" overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Add Case</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <Input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <Input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="outline-none"
            required
          />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>

        <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder='Select status' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup onChange={(e)=>setFormData((prevData) => ({
      ...prevData,
      'status':e.target.value
    }))}>
          <SelectLabel>Select Status</SelectLabel>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Ongoing">Ongoing</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
