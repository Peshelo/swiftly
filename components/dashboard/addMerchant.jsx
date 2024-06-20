"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import pb from "@/lib/connection";
import { toast } from 'sonner';
import { Textarea } from '@nextui-org/input';

export default function AddMerchantForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    website: '',
    phoneNumber: '',
    isActive: false,
    cases: null,
  });

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    emailVisibility: true,
    password: '',
    passwordConfirm: '',
    name: '',
    role: 'MERCHANT',
    merchant: null,
  });

  const handleMerchantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userRecord = await pb.collection('users').create(userData);
      let merchantRecord = await pb.collection('merchant').create({
        ...formData,
        user: userRecord.id,
      });
      toast.success("Merchant and User added successfully");
      console.log(merchantRecord);
    } catch (e) {
      toast.error(e.message);
    }
    console.log(formData);
    console.log(userData);
  };

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Add New Merchant</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Details */}
        <div className="border-r px-2">
          <h3 className="text-xl font-bold">User Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              name="passwordConfirm"
              value={userData.passwordConfirm}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserChange}
              required
            />
          </div>
        </div>

        {/* Merchant Details */}
        <div>
          <h3 className="text-xl font-bold">Merchant Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleMerchantChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleMerchantChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleMerchantChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleMerchantChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <Input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleMerchantChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleMerchantChange}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleMerchantChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Is Active</label>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 mt-6">
          <Button
            type="submit"
            className="w-full"
          >
            Add Merchant
          </Button>
        </div>
      </form>
    </div>
  );
}
