"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import pb from "@/lib/connection";

export default function ReportCase() {
  const [goal, setGoal] = React.useState(350);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    city: "",
    address: "",
    merchant: "",
    priority: "",
    images: null,
  });
  const [errors, setErrors] = React.useState({});
  const [merchants, setMerchants] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    async function fetchMerchants() {
      try {
        const records = await pb.collection("merchant").getFullList();
        setMerchants(records);
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    }

    fetchMerchants();
  }, []);

  React.useEffect(() => {
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    getCurrentLocation();
  }, []);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({
        ...form,
        [name]: files,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.merchant) newErrors.merchant = "Merchant is required";
    if (!form.priority) newErrors.priority = "Priority is required";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("city", form.city);
        formData.append("address", form.address);
        formData.append("merchant", form.merchant);
        formData.append("priority", form.priority);
        formData.append("status", "Open");
        if (currentLocation) {
          formData.append("latitude", currentLocation.latitude);
          formData.append("longitude", currentLocation.longitude);
        }
        if (form.images) {
          for (let i = 0; i < form.images.length; i++) {
            formData.append("images", form.images[i]);
          }
        }

        const record = await pb.collection("cases").create(formData);
        console.log("Record created:", record);
        setErrors({});
      } catch (error) {
        console.error("Error creating record:", error);
      }
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Report a case</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Report a case</DrawerTitle>
            <DrawerDescription>Report a case using your current location.</DrawerDescription>
          </DrawerHeader>
          <div className="pb-0">
            <form onSubmit={handleSubmit} className="text-sm max-sm:mx-2">
              <div className="mt-2">
                <label>
                  Title
                  <Input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title}</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Description
                  <Input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.description && (
                    <span className="text-red-500">{errors.description}</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <label>
                  City
                  <Input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.city && (
                    <span className="text-red-500">{errors.city}</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Address
                  <Input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.address && (
                    <span className="text-red-500">{errors.address}</span>
                  )}
                </label>
              </div>
              <div className="mt-2 w-full">
                <div className="w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="images">Images</Label>
                  <Input
                    id="images"
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label>
                  Priority
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  >
                    <option disabled selected>Select a priority</option>
                    <option value="green">High Priority</option>
                    <option value="yellow">Medium Priority</option>
                    <option value="red">Low Priority</option>
                  </select>
                  {errors.priority && (
                    <span className="text-red-500">{errors.priority}</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Merchant
                  <select
                    name="merchant"
                    value={form.merchant}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  >
                    <option value="">Select a merchant</option>
                    {merchants.map((merchant) => (
                      <option key={merchant.id} value={merchant.id}>
                        {merchant.name}
                      </option>
                    ))}
                  </select>
                  {errors.merchant && (
                    <span className="text-red-500">{errors.merchant}</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                {currentLocation && (
                  <p className="text-gray-600 text-sm">
                    {`Your current location is latitude:${currentLocation.latitude} and longitude: ${currentLocation.longitude}.`}
                  </p>
                )}
              </div>
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
