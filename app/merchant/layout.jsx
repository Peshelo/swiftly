"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import pb from "@/lib/connection"
import { FiGrid, FiFileText, FiMap, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi"
import Logo from "@/components/ui/logo"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPath = router.pathname

  const logout = () => {
    pb.authStore.clear()
    router.push("/auth/sign-in")
  }

  const NavLinks = () => (
    <nav className="flex flex-col gap-2 mt-6 flex-1">
      <Link
        href="/merchant"
        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
          currentPath === "/merchant"
            ? "bg-green-600 text-white shadow-sm"
            : "text-gray-300 hover:bg-green-700 hover:text-white"
        }`}
      >
        <FiGrid /> Dashboard
      </Link>
      <Link
        href="/merchant/cases"
        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
          currentPath === "/merchant/cases"
            ? "bg-green-600 text-white shadow-sm"
            : "text-gray-300 hover:bg-green-700 hover:text-white"
        }`}
      >
        <FiFileText /> Cases
      </Link>
      <Link
        href="/merchant/map-view"
        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
          currentPath === "/merchant/map"
            ? "bg-green-600 text-white shadow-sm"
            : "text-gray-300 hover:bg-green-700 hover:text-white"
        }`}
      >
        <FiMap /> Map
      </Link>
    </nav>
  )

  return (
    <section className="w-screen h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <Logo />
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <NavLinks />

        {/* Bottom section */}
        <div className="mt-auto flex flex-col border-t border-slate-700">
          <Link
            href="/merchant/settings"
            className={`flex items-center gap-3 px-4 py-2 transition ${
              currentPath === "/merchant/settings"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-300 hover:bg-green-700 hover:text-white"
            }`}
          >
            <FiSettings /> Settings
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-40 md:hidden p-2 rounded-md bg-slate-900 text-white"
      >
        <FiMenu size={20} />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-white border-b shadow-sm flex items-center justify-end px-4">
          {/* Add any user dropdown or quick actions here */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </section>
  )
}
