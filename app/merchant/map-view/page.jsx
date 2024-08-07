"use client"
import { useState,useEffect, Suspense } from "react";
import { Map, Marker, NavigationControl, Popup, FullscreenControl, ScaleControl, GeolocateControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import pb from "@/lib/connection";
import TrackCase from "@/components/dashboard/trackCase";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaDirections } from "react-icons/fa";

// import MapboxDirections from "@mapbox/mapbox-gl-directions";
function MapPage() {
    const [cases, setCases] = useState([])
    const mapBoxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY;
    const [coordinates, setCoordinates] = useState({
        latitude: -17.825165,
        longitude: 31.053028
    });

    const fetchCases = async () => {
        try {
          const list = await pb.collection('cases').getFullList();
          console.log(list)
          setCases(list)
        } catch (e) {
          toast.error(e.message)
        }
      }

      useEffect(() => {
        fetchCases();
      }, []);
    // Example coordinates for two places in Harare
    // const places = [
    //     { longitude: 31.053028, latitude: -17.825165, name: "Place 1" },
    //     { longitude: 31.045591, latitude: -17.820623, name: "Place 2" }
    // ];

    // Map.addControl(
    //     new MapboxDirections({
    //         accessToken: mapBoxKey
    //     }),
    //     'top-left'
    // );
    const [selectedCase, setSelectedCase] = useState(null);

    return (
        <>
            <Map
                mapboxAccessToken={mapBoxKey}
                initialViewState={{
                    longitude: coordinates.longitude,
                    latitude: coordinates.latitude,
                    zoom: 14
                }}
                style={{ width: "100%", height: "100vh" }}
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                mapStyle="mapbox://styles/mapbox/standard"

            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                {/* <MapboxDirections accessToken={mapBoxKey} /> */}
                <ScaleControl />

                {cases.length > 0 && cases.map((mycase, index) => (
               <Marker 
               key={index}
               longitude={mycase?.longitude}
               latitude={mycase?.latitude}
               onClick={() => setSelectedCase(mycase)}
               color={
                mycase.status === 'Open' ? '#0000FF' : // Green for Open
                mycase.status === 'Cancelled' ? '#FF0000' : // Red for Canceled
                mycase.status === 'In Progress' ? '#FFFF00' : // Yellow for In Progress
                '#00FF00' // Default color (Blue) if none of the statuses match
            }
           />
                      
                ))}

                {selectedCase && (
                    <Popup
                        longitude={selectedCase.longitude}
                        latitude={selectedCase.latitude}
                        onClose={() => setSelectedCase(null)}
                        closeOnClick={false}
                        className="p-2"
                        anchor="top"
                    >
                        <div className="flex flex-col justify-between gap-y-1 items-center">
                            <p>{selectedCase?.title}</p>
                            <Badge variant="secondary">{selectedCase?.status}</Badge>
                            <TrackCase recordId={selectedCase.id}/>
                            <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCase?.latitude},${selectedCase?.longitude}`} className="gap-x-2 text-sm border-t text-gray-700 mt-2 flex flex-row pt-2 hover:text-blue-600" >
                    <FaDirections size={15} />
        Get Directions </Link>
                        </div>
                    </Popup>
                )}
                {/* <MapboxDirections/> */}
            </Map>
        </>
    );
}


export default function Page(){
    return(
        <div>
            <Suspense fallback={<div>Loading Map...</div>}>
            <MapPage/>
            </Suspense>
        </div>
    )
}
