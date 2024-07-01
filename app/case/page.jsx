"use client"
import { useState, useEffect, Suspense } from "react";
import pb from "@/lib/connection";
import { toast } from 'sonner';
import { Badge } from "@/components/dashboard/badge/badge";
import { Modal } from "@nextui-org/react";
import { HiArrowLeft, HiCollection } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'


export default function CaseDetailsPage() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    merchant: null,
    images: [],
    status: '',
    priority: ''
  });
  const [imageModal, setImageModal] = useState({ isOpen: false, src: '' });
  const router = useRouter();
//   console.log(router);
//   const { caseId } = router.query;
    // const [searchParams] = useSearchParams();
  const caseId = useSearchParams().get('caseId');

  const fetchCaseDetails = async (id) => {
    try {
      const record = await pb.collection('cases').getFirstListItem(`id="${id}"`, {
        expand: 'merchant',
      });
      setFormData({
        id: record.id,
        title: record.title,
        description: record.description,
        city: record.city,
        address: record.address,
        latitude: record.latitude,
        longitude: record.longitude,
        merchant: record.merchant,
        status: record.status,
        images: record.images,
        priority: record.priority,
        merchant: record.expand.merchant
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (caseId) {
      fetchCaseDetails(caseId);
    }
  }, [caseId]);

  const openImageModal = (src) => {
    setImageModal({ isOpen: true, src });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, src: '' });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div className="w-[1200px] mx-auto">
      <Button onClick={() => router.back()} className="mb-4 flex flex-row gap-x-2 text-gray-500 my-4" variant={'flat'}>
        <HiArrowLeft size={20}/>Back
      </Button>
      {formData.title ? (
        <div className="shadow-md border rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 border-b py-2">{formData.title.toUpperCase()}</h1>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {formData.description}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">City:</span> {formData.city}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Address:</span> {formData.address}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Status:</span> {formData.status}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Priority:</span> {formData.priority.toUpperCase()}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Latitude:</span> {formData.latitude}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Longitude:</span> {formData.longitude}</p>
          <div className="text-gray-700 mb-2">
            <span className="font-semibold">Merchant:</span>
            <p>Name: {formData.merchant?.name}</p>
            <p>Contact: {formData.merchant?.phoneNumber}</p>
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-semibold">Pictures:</span>
            <div className="flex flex-row w-full gap-2 mt-2">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={`https://swiftly.pockethost.io/api/files/vc5muu8hvdtzlf1/${formData.id}/${image}`}
                  alt="case"
                  className="w-20 h-20 border hover:border-2 hover:shadow-md duration-75 rounded-md object-cover cursor-pointer"
                  onClick={() => openImageModal(`https://swiftly.pockethost.io/api/files/vc5muu8hvdtzlf1/${formData.id}/${image}`)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[200px] w-full p-4 items-center justify-center text-gray-400">
          <HiCollection size={20} className="text-gray-500 my-2" />
          Case not found
        </div>
      )}

      <Modal open={imageModal.isOpen} onClose={closeImageModal}>
        <Modal.Header>
          <span>Image</span>
        </Modal.Header>
        <Modal.Body>
          <img src={imageModal.src} alt="case" className="w-full h-auto object-cover" />
        </Modal.Body>
      </Modal>
    </div>
    </Suspense>
  );
}
