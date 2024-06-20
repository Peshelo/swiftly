"use client"
import { useState,useEffect } from "react";
import { Map, Marker, NavigationControl, Popup, FullscreenControl, ScaleControl, GeolocateControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import pb from "@/lib/connection";
import TrackCase from "@/components/dashboard/trackCase";
export default function MapPage() {
    const [cases, setCases] = useState([])
    const mapBoxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY;

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
                    longitude: 31.049753,
                    latitude: -17.811888,
                    zoom: 14
                }}
                style={{ width: "100%", height: "100vh" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {cases.length > 0 && cases.map((mycase, index) => (
                    <Marker 
                        key={index}
                        longitude={mycase?.longitude}
                        latitude={mycase?.latitude}
                        onClick={() => setSelectedCase(mycase)}
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
                        </div>
                    </Popup>
                )}
                {/* <MapboxDirections/> */}
            </Map>
        </>
    );
}
