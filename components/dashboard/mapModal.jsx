import { useState, useEffect } from 'react';
import { Map, Marker, NavigationControl, Popup, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from '@/components/ui/badge';
import TrackCase from '@/components/dashboard/trackCase';

const MapModal = ({ isOpen, onClose, caseData }) => {
  const mapBoxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY;

  if (!isOpen || !caseData) {
    return null;
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 bg-opacity-50 backdrop-blur-sm">
      <div onClick={(e)=>e.stopPropagation()} className="relative w-full max-w-4xl h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        <button className="absolute top-2 right-2 z-50 text-gray-700" >
          Close
        </button>
        <Map
          mapboxAccessToken={mapBoxKey}
          initialViewState={{
            longitude: caseData.longitude,
            latitude: caseData.latitude,
            zoom: 14,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/standard"
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          <Marker longitude={caseData.longitude} latitude={caseData.latitude} />
          <Popup
            longitude={caseData.longitude}
            latitude={caseData.latitude}
            onClose={onClose}
            closeOnClick={false}
            className="p-2"
            anchor="top"
          >
            <div className="flex flex-col justify-between gap-y-1 items-center">
              <p>{caseData.title}</p>
              <Badge variant="secondary">{caseData.status}</Badge>
              <TrackCase recordId={caseData.id} />
            </div>
          </Popup>
        </Map>
      </div>
    </div>
  );
};

export default MapModal;
