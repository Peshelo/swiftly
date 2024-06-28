"use client";
import React, { useState, useEffect } from "react";
import pb from "@/lib/connection";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiBan, HiOutlineSearch, HiUserRemove, HiPencil } from "react-icons/hi";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AddMerchantForm from "./addMerchant";
import EditMerchantForm from "./editMerchant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditCaseForm from "./editCase";
import TrackCase from "./trackCase";

export default function MerchantsCases() {
  const [merchants, setMerchants] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchMerchants = async () => {
    try {
      const list = await pb.collection('merchant').getFullList();
      setMerchants(list);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchCases = async () => {
    try {
      const list = await pb.collection('cases').getFullList();
      setCases(list);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await pb.collection('cases').delete(id);
      await fetchCases();
      toast.success("Record has been deleted");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const search = async () => {
    if (!searchParam) {
      fetchCases();
      return;
    }
    const record = await pb.collection('cases').getFirstListItem(`title ~ "${searchParam}"`);
    setCases(record.items);
  };

  useEffect(() => {
    const unsubscribe = pb.collection('cases').subscribe('*', (e) => {
      fetchCases();
    });
    fetchMerchants();
    fetchCases();
  }, []);

  // Function to map priority to colors
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'backlog':
        return 'bg-yellow-200 text-yellow-800';
      case 'todo':
        return 'bg-blue-200 text-blue-800';
      case 'in progress':
        return 'bg-green-200 text-green-800';
      case 'done':
        return 'bg-purple-200 text-purple-800';
      case 'canceled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <div className="w-full flex row items-center justify-end gap-x-1 mb-4">
        <Input type="text" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} placeholder="Search for cases..." className="outline-none w-1/4" />
        <Button onClick={() => search()}><HiOutlineSearch /></Button>
      </div>
      <Card className="p-0">
        <CardHeader>
          <CardTitle>Cases</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {cases.length > 0 ? (
            <div className="space-y-4">
              {cases.map((mycase) => (
                <div key={mycase.id} className={`rounded-lg shadow-md border border-gray-300 transition duration-300 hover:shadow-lg ${getPriorityColor(mycase.priority.toLowerCase())} p-4`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <span className="block text-lg font-semibold">{mycase.title}</span>
                      <span className="block text-sm text-gray-600">{mycase.description.length > 50 ? mycase.description.substring(0, 50) + '...' : mycase.description}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="block text-sm text-gray-600"><strong>City:</strong> {mycase.city}</span>
                      <span className="block text-sm text-gray-600"><strong>Address:</strong> {mycase.address.length > 50 ? mycase.address.substring(0, 50) + '...' : mycase.address}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="block text-sm text-gray-600"><strong>Coordinates:</strong> {mycase.latitude}, {mycase.longitude}</span>
                      <span className="block text-sm text-gray-600"><strong>Created:</strong> {new Date(mycase.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <Badge>{mycase.status}</Badge>
                    </div>
                    <div>
                      <Badge>{mycase.priority.toUpperCase()}</Badge>
                    </div>
                    <div className="flex gap-2">
                    <TrackCase recordId={mycase.id} />

                      <Sheet className="w-1/2">
                        <SheetTrigger>
                          <div className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                            <HiPencil />
                            <span className="ml-2">Edit</span>
                          </div>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Case</SheetTitle>
                            <EditCaseForm recordId={mycase.id} />
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                      <div onClick={() => deleteRecord(mycase.id)} className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                        <HiUserRemove />
                        <span className="ml-2">Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              No records found
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
