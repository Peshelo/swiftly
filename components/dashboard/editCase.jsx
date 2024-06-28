"use client";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import pb from "@/lib/connection";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditCaseForm({ recordId }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    merchant: null,
    status: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchCaseDetails = async () => {
    try {
      const record = await pb.collection("cases").getOne(recordId);
      setFormData({
        title: record.title,
        description: record.description,
        city: record.city,
        address: record.address,
        latitude: record.latitude,
        longitude: record.longitude,
        merchant: record.merchant,
        status: record.status,
        priority: record.priority,
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let record = await pb.collection("cases").update(recordId, formData);
      toast.success("Case edited successfully");
      console.log(record);
    } catch (e) {
      toast.error(e.message);
    }
    console.log(formData);
  };

  useEffect(() => {
    fetchCaseDetails();
  }, []);

  return (
    <div className="">
      <div className="mb-4">
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
        <div className="mt-2">
                <label>
                  Priority
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  >
                    <option disabled selected>Select a priority</option>
                    <option value="red">High Priority</option>
                    <option value="yellow">Medium Priority</option>
                    <option value="green">Low Priority</option>
                  </select>
                </label>
              </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                status: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formData.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
          <Button type="submit" className="w-full bg-orange-400">
            Edit Case
          </Button>
        </div>
      </form>
    </div>
  );
}
