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
  

export default function AdminSideNav() {
    return (
        <nav className="w-[299px] h-full">
<Command >
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="General">
      <CommandItem><Link href="/super_admin">Dashboard</Link></CommandItem>
    </CommandGroup>
    <CommandGroup heading="Merchants">
      <CommandItem><Link href="/super_admin/merchants" className="w-full">Merchants</Link></CommandItem>
      <CommandItem>Merchant Location</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Cases">
      <CommandItem>All Cases</CommandItem>
      <CommandItem>Cases Map</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
        </nav>
    );
}