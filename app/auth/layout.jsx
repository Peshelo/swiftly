import Logo from "@/components/ui/logo";
import Image from "next/image";

 
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-10 p-4 w-screen h-screen bg-gray-100 gap-4">
      <div className="col-span-4 h-full border-2 bg-white shadow-sm rounded-md">
        {children}
      </div>
      <div className="col-span-6 bg-white shadow-md rounded-md">
        {/* Background Image */}
        <div className="w-full h-full relative">
  {/* Background image with gradient overlay */}
  <div className="relative w-full h-full">
    <Image src="/assets/images/bg1.png" layout="fill" className="rounded-md" objectFit="cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md" />
  </div>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-md" />

  {/* Text aligned to bottom left */}
  <div className="absolute bottom-0 left-0 mb-8 ml-8 text-white text-left">
    <Logo />
    <p className="text-gray-100 text-sm">Anywhere, anytime</p>
  </div>
</div>

      </div>

    </div>
  )
}