"use client"
import { Input } from "@/components/ui/input"
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import pb from "@/lib/connection";
import { toast } from 'sonner';
import { useState,useEffect} from "react";
import { Textarea } from "@nextui-org/input";



export default function EditMerchantForm({recordId}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    website: '',
    phoneNumber: '',
    isActive: false,
    cases: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const fetchMerchantDetails = async ()=>{
    try{
      const record = await pb.collection('merchant').getOne(recordId);
      setFormData({
        name: record.name,
        description: record.description,
        city: record.city,
        address: record.address,
        website: record.website,
        phoneNumber: record.phoneNumber,
        isActive: record.isActive,
        cases: record.cases
      })
    }catch(e){
      toast.error(e.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        let record = await pb.collection('merchant').update(recordId,formData);
        toast.success("Merchant edited successfully");
        console.log(record);
        
    }catch(e){
        toast.error(e.message)
    }
    // Add your submit logic here
    console.log(formData);
  };
useEffect(()=>{
  fetchMerchantDetails();
},[])

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Edit Merchant</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
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
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <Input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Is Active</label>
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full bg-orange-400"
          >
            Edit Merchant
          </Button>
        </div>
      </form>
    </div>
  );
}
