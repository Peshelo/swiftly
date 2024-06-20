"use client"
import React, { useState, useEffect } from "react"

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EditCaseForm from "./editCase";






export default function MerchantsCases() {
  const [merchants, setMerchants] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [cases, setCases] = useState([])

  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState({})


  const fetchMerchants = async () => {
    try {
      const list = await pb.collection('merchant').getFullList();
      console.log(list)
      setMerchants(list)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const fetchCases = async () => {
    try {
      const list = await pb.collection('cases').getFullList();
      console.log(list)
      setCases(list)
    } catch (e) {
      toast.error(e.message)
    }
  }


  const deleteRecord = async (id) => {
    try {
      await pb.collection('cases').delete(id);
      await fetchMerchants();
      toast.success("Record has been deleted")

    } catch (e) {
      toast.error(e.message)
    }
  }
  const search = async () => {
    const record = await pb.collection('cases').getFirstListItem(
      // 'name="asd"',
      `name=${searchParam}`,

    );
    console.log(record)
  }
  useEffect(() => {
    fetchMerchants();
    fetchCases();
  }, []);

  const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: ArrowUpCircle,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle2,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: XCircle,
    },
  ]

  return (
    <>
      <div className="w-full flex row items-center justify-end gap-x-1">
        <Input type="text" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} placeholder="Search for cases..." className="outline-none w-1/4" />
        <Button onClick={() => search()}><HiOutlineSearch />
        </Button>
      </div>
      <Card x-chunk="dashboard-01-chunk-5" className="p-0">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
          <table className="text-md w-full bg-white rounded-md" aria-label="Merchants Table">
        <thead className="bg-gray-200">
          <tr className="p-2 border-b">
            <th className="pl-4 p-2 text-left">CaseID</th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">City</th>
            <th className="text-left">Address</th>
            <th className="text-left">Latitude</th>
            <th className="text-left">Longitude</th>
            <th className="text-left p-1">Created</th>
            <th className="pr-4 p-1 text-left">Status</th>
            <th className="pr-4 p-1 text-left">Priority</th>
            <th className="pr-4 p-1"></th>
            <th className="pr-4 p-1"></th>

          </tr>
        </thead>
        <tbody className="px-2">
          {cases.map(mycase => (
            <tr className="border-b hover:bg-gray-50 duration-75" key={mycase.id}>

              <td className="pl-4  py-4">{mycase.id}</td>
              <td className="pl-4  py-4">{mycase.title}</td>
              <td>{mycase.description}</td>

              {/* <td>{merchant.description.split(50)[0] + '...'}</td> */}
              <td>{mycase.city}</td>
              <td>{mycase.address.split(50)[0] + '...'}</td>
              <td>{mycase.latitude}</td>
              <td>{mycase.longitude}</td>
              <td>{mycase.created}</td>

              <td>
                <div className="flex items-center space-x-4">
                  <Badge>{mycase.status}</Badge>
                  {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
            
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> */}
                </div>
              </td>
              <td>
              <td>
              <p status={formData?.priority} className={`bg-${formData?.priority}-500 p-2 w-fit text-white rounded-sm text-xs`}>
                  {formData?.priority.toUpperCase()}
                </p>
              </td>
              </td>
              <td>
                <Sheet className="w-1/2">
                  <SheetTrigger><div className="flex flex-row items-center text-orange-600 gap-x-2"><HiPencil />
                    Edit</div></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>__</SheetTitle>
                      <EditCaseForm recordId={mycase.id} />
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
                    <DropdownMenuItem><div onClick={() => deleteRecord(mycase.id)} className="flex flex-row items-center text-red-600 gap-x-2"><HiUserRemove />
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
            </CardContent> </Card>
     

    </>
  );
}
