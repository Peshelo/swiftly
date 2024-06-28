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
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    async function register(e) {
        // const router = useRouter();
        e.preventDefault();

        setError('');

        //if username is empty or password is empty
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
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
                    <Link href="/" className="p-2 rounded-sm">
                         <Logo/>
                    </Link>
                    <h1 className="w-full text-center text-xl font-semibold my-2">Welcome back</h1>
                    <p className="text-red-600 text-sm w-full">{error}</p>
                    <Input type="email" placeholder="Email" name="username" value={formData.username} onChange={handleInputChange} onFocus={()=>setError('')} />
                    <Input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} onFocus={()=>setError('')}/>
                    <Button variant={''} type="submit" className="w-full p-2">Login</Button>
                    <p className="my-2 text-sm text-gray-600 w-full text-center"><Link className="text-black underline underline-offset-1" href={'/auth/forgot-password'}>Forgot password?</Link></p>
                </form>
            </div>

        </>
    );
}
