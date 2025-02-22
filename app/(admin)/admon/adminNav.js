"use client"; // Required for client-side interactivity

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

export default function AdminNav({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const adminCookie = Cookies.get('admin');
    if (!adminCookie) {
      router.push('/adlogin');
    }
  }, []);

  const adminNavOptions = [
    { name: "Create Book", href: "/admon/createbook" },
    { name: "Edit Book", href: "/admon/editbook" },
    { name: "Create Bundle", href: "#" },
    { name: "Review Access", href: "/admon/reviewaccess" },
    { name: "Manage Coupon", href: "/admon/coupon" }
  ];

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 shadow-lg transition-transform transform z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={300}
                className="w-32"
                priority
              />
            </Link>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <nav className="mt-2">
          {/* Group 2 */}
          <div>
            {adminNavOptions.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium hover:bg-gray-100 ${pathname === item.href
                  ? item.name === "Logout"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-100 text-blue-600"
                  : ""
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={"#"}
              className={`flex items-center px-6 py-3 text-sm font-medium hover:bg-gray-100 bg-red-50 text-red-600`}
            >
              Log Out
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={300}
              height={300}
              className="w-32"
            />
          </Link>
        </header>
        <main className="p-2">
          {children}
        </main>
      </div>
    </div>
  );
}