import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex flex-row items-center gap-x-2">
            <Image src={'/assets/images/zrp.jpg'} width={50} height={50} alt="logo"/>
            {/* <h1 className="text-green-500"><b className="text-green-700">Z.R.P</b></h1> */}
        </div>
    );
}