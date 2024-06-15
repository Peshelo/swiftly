"use client"
import pb from "@/lib/connection";
// import pb from "@/app/lib/connection";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default function Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    async function register(e) {
        // const router = useRouter();
        e.preventDefault();
        try {
            const authData = await pb.collection('users').authWithPassword(
                formData.username,
                formData.password,
            );
            toast.success("User Login succesful")
            let userRole = authData.record.role
            if(userRole == "SUPER_ADMIN"){
                router.push('/super_admin')
            }else if(userRole == "MERCHANT"){
                router.push('/merchant')
            }else{
                throw Error("Failed to login")
            }
            // router.push('/dashboard')
            // router.push({
            //     pathname: '/search',
            //     query: {
            //         // search: searchInput,
            //     },
            // })

        } catch (error) {
            toast.error(error.message)
        }
    }
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="flex flex-col h-full w-full justify-center items-center p-10">
                <form onSubmit={register} className="w-full flex flex-col gap-y-2 items-center">
                    <div className="p-2 bg-black rounded-sm">
                         <Logo/>
                    </div>
                    <h1 className="w-full text-center text-xl font-semibold my-2">Welcome back</h1>
                    <Input type="email" placeholder="Email" name="username" value={formData.username} onChange={handleInputChange} />
                    <Input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange}/>
                    <Button variant={''} type="submit" className="w-full p-2">Login</Button>
                    <p className="my-2 text-sm text-gray-600 w-full text-center">Do not have an account? <Link className="text-black" href={'/auth/register'}>Register</Link></p>
                </form>
            </div>

        </>
    );
}
