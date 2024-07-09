"use client";
import React, { useState, useEffect } from "react";
import pb from "@/lib/connection";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiBan, HiOutlineSearch, HiUserRemove, HiPencil, HiEye, HiMap } from "react-icons/hi";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AddMerchantForm from "./addMerchant";
import EditMerchantForm from "./editMerchant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditCaseForm from "./editCase";
import TrackCase from "./trackCase";
import { Snippet } from "@nextui-org/react";
import Link from "next/link";
import MapModal from "./mapModal";
import { IoCall, IoPhoneLandscape } from "react-icons/io5";
import { FaDirections } from "react-icons/fa";


export default function MerchantsCases() {
  const [merchants, setMerchants] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedCase, setSelectedCase] = useState(null);

  const fetchMerchants = async () => {
    try {
      const list = await pb.collection('merchant').getFullList(
        //Filter by created date
        {
          sort: '-created',
        }
      );
      setMerchants(list);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchCases = async () => {
    try {
      const list = await pb.collection('cases').getFullList(
        {
          sort: '-created',
        }
      );
      setCases(list);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteRecord = async (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await pb.collection('cases').delete(id);
        await fetchCases();
        toast.success("Record has been deleted");
      } catch (e) {
        toast.error(e.message);
      }
    }
 
  };

  const search = async () => {
    if (!searchParam) {
      fetchCases();
      return;
    }
    const record = await pb.collection('cases').getList(1, 50, {
      filter: `id ~ "${searchParam}"`
  });      
    setCases(record.items);
    console.log(record);
  };

  const handleMarkerClick = (caseData) => {
    setSelectedCase(caseData);
  };

  const closeModal = () => {
    setSelectedCase(null);
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
        <Input type="text" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} placeholder="Search by case Id..." className="outline-none w-1/4" />
        <Button onClick={() => search()}><HiOutlineSearch /></Button>
      </div>
      <Card className="p-0">
        <CardHeader>
          <CardTitle>Cases</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {cases ? (
            <div className="space-y-4">
              {cases.map((mycase) => (
                <div key={mycase.id} className={`rounded-lg shadow-md border border-gray-300 transition duration-300 hover:shadow-lg  p-4`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <span className="block text-lg font-semibold">{mycase.title}</span>
                      <span className="block text-sm text-gray-600">{mycase.description.length > 50 ? mycase.description.substring(0, 50) + '...' : mycase.description}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="block text-sm text-gray-600"><strong>City:</strong> {mycase.city}</span>
                      <span className="block text-sm text-gray-600"><strong>Address:</strong> {mycase.address.length > 50 ? mycase.address.substring(0, 50) + '...' : mycase.address}</span>
                     {mycase?.phoneNumber && <a href={`tel:${mycase?.phoneNumber}`} className="flex flex-row p-1 w-fit items-center hover:text-yellow-500 duration-75 gap-x-2 text-sm text-gray-600"><IoCall size={15} />{mycase?.phoneNumber}</a>
                    }
                    </div>
                    <div className="col-span-1">
                      <span className="block text-sm text-gray-600"><strong>Coordinates:</strong> {mycase.latitude}, {mycase.longitude}</span>
                      <span className="block text-sm text-gray-600"><strong>Created:</strong> {new Date(mycase.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between flex-wrap items-center p-2 rounded-md mt-4 border-t bg-white shadow-lgs">
                    <div>
                      <Snippet color="success" className="bg-white">{mycase?.id}</Snippet>
                    </div>
                    <div>
                    <Badge className={`text-xs bg-${mycase?.priority}-200 text-${mycase?.priority}-700`} variant="outline" >
        {mycase?.status}
      </Badge>
                    </div>
                    <div className="flex gap-2">
                    {/* <TrackCase recordId={mycase.id} /> */}
                    {/* <Button onClick={() => handleMarkerClick(mycase)} className="gap-x-2 bg-gray-200 text-gray-700 hover:text-white"><HiMap size={20}/>View on map</Button> */}
                    {/* const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`; */}
                    {/* <Link href={`https://www.google.com/maps/dir/?api=1&destination=${mycase?.latitude},${mycase?.longitude}`} className="gap-x-2 bg-gray-200 text-gray-700 flex flex-row p-2 rounded-md hover:text-white"><HiMap size={20}/>Get directions</Link> */}
                    <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${mycase?.latitude},${mycase?.longitude}`} className="gap-x-2 bg-gray-200 text-gray-700 flex flex-row p-2 rounded-md hover:text-white" >
                    <FaDirections size={20} />
        Get Directions </Link>
                    <Link href={`/merchant/map?lat=${mycase?.latitude}&long=${mycase?.longitude}`} className="gap-x-2 bg-gray-200 text-gray-700 flex flex-row p-2 rounded-md hover:text-white"><HiMap size={20}/>View on map</Link>

                    <Link className="bg-green-500 rounded-md p-2 px-4 gap-x-2 flex flex-row text-white" href={`/case?caseId=${mycase.id}`}><HiEye size={20}/>View Case</Link>
                    <MapModal isOpen={!!selectedCase} onClose={closeModal} caseData={selectedCase} />

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
