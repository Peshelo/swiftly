import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Link from "next/link";
import { HiAdjustments, HiDocument, HiFolder, HiMap, HiUser, HiViewGrid } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";


  

export default function AdminSideNav() {
    return (
        <nav className="w-full bg-transparent h-full">
<Command  className="bg-transparent">
  <div className="w-[299px]"></div>
  <CommandList className="text-white">
    <CommandGroup heading="General" >
      <CommandItem><Link href="/super_admin" className="flex flex-row w-full items-center gap-x-2 py-2 text-white"><HiViewGrid size={20} />
       Dashboard</Link></CommandItem>
    </CommandGroup>
    <CommandGroup heading="Merchants">
      <CommandItem ><Link href="/super_admin/merchants" className="flex flex-row w-full items-center gap-x-2 py-2 text-white"><HiUserGroup size={20} />Merchants</Link></CommandItem>
    </CommandGroup>
    <CommandGroup heading="Cases">
      <CommandItem><Link href={'/super_admin/cases'} className="flex flex-row -full items-center gap-x-2 py-2 text-white"><HiDocument size={20} />All Cases</Link></CommandItem>
      <CommandItem><Link href={'/super_admin/cases/map'} className="flex flex-row -full items-center gap-x-2 py-2 text-white"><HiMap size={20} />Cases Map</Link></CommandItem>
    </CommandGroup>
    <CommandGroup heading="Settings" className="border-none">
      <CommandItem><Link href={'/super_admin/profile'} className="flex flex-row -full items-center gap-x-2 py-2 text-white"><HiUser size={20} />Profile</Link></CommandItem>
      <CommandItem><Link href={'/super_admin/settings'} className="flex flex-row -full items-center gap-x-2 py-2 text-white"><HiAdjustments size={20} />Settings</Link></CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
        </nav>
    );
}