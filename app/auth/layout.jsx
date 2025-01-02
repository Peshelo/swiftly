import Logo from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";

 
export default function Layout({ children }) {
  return (
    <div className="flex flex-row items-center justify-center gap-x-5 p-4 w-screen h-screen  gap-4">
      <div className="h-full flex flex-col justify-center items-center bg-white">
        
      <Link href="/" className="p-2 rounded-sm">
      <Image src={'/assets/images/zrp.jpg'} width={500} height={500} alt="logo"/>
      </Link>
        {/* <h1><b className="text-2xl">Z.R.P Emergency Portal</b></h1> */}
      </div>

      <div className="h-full w-[500px] bg-white">
        {children}
      </div>

    </div>
  )
}