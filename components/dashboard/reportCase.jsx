"use client"
import * as React from "react"
import { Minus, Plus } from "lucide-react"
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
import pb from "@/lib/connection";
import { Input } from "../ui/input"
import { Textarea } from "@nextui-org/input"
import { Label } from "../ui/label"


export default function ReportCase() {
  const [goal, setGoal] = React.useState(350)
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    merchant: '',
  })
  const [errors, setErrors] = React.useState({})

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  function validate() {
    const newErrors = {}
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.description) newErrors.description = 'Description is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.address) newErrors.address = 'Address is required'
    if (!form.latitude) newErrors.latitude = 'Latitude is required'
    if (!form.longitude) newErrors.longitude = 'Longitude is required'
    if (!form.merchant) newErrors.merchant = 'Merchant is required'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const data = {
          ...form,
          status: 'Open',
        }
        const record = await pb.collection('cases').create(data)
        console.log('Record created:', record)
        setErrors({})
      } catch (error) {
        console.error('Error creating record:', error)
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
            <DrawerDescription>Report a case.</DrawerDescription>
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
                  {errors.title && <span className="text-red-500">{errors.title}</span>}
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
                  {errors.description && <span className="text-red-500">{errors.description}</span>}
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
                  {errors.city && <span className="text-red-500">{errors.city}</span>}
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
                  {errors.address && <span className="text-red-500">{errors.address}</span>}
                </label>
              </div>
             <div className="flex flex-row gap-x-2 mt-2">
             <div className="">
                <label>
                  Latitude
                  <Input
                    type="text"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.latitude && <span className="text-red-500">{errors.latitude}</span>}
                </label>
              </div>
              <div className="">
                <label>
                  Longitude
                  <Input
                    type="text"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.longitude && <span className="text-red-500">{errors.longitude}</span>}
                </label>
              </div>
             </div>
              <div className="mt-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" className="w-full" />
    </div>
              </div>
              <div className="mt-2">
                <label>
                  Merchant
                  <Input
                    type="text"
                    name="merchant"
                    value={form.merchant}
                    onChange={handleChange}
                    className="block w-full border p-2"
                  />
                  {errors.merchant && <span className="text-red-500">{errors.merchant}</span>}
                </label>
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
  )
}
