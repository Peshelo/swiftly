import { buttonVariants } from "@/components/ui/button"
import Logo from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-row p-4 border-b shadow-sm justify-between items-center">
        <nav className="flex flex-row items-center gap-x-4">
          <Logo/>
        <ul className="flex flex-row gap-x-2">
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        </nav>
       <div className="flex flex-row gap-x-2">
       <Link href="/auth/sign-in" className={buttonVariants({ variant: "outline" })}>Sign In</Link>
       <Link href="/auth/register" className={buttonVariants({  })}>Get Started</Link>
       </div>
        </div>
    </main>
  );
}
