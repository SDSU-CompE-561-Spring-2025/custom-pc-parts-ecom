"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { isAuthenticated, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on component mount and when localStorage changes
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    // Check initially
    checkAuthStatus();

    // Listen for storage events (login/logout in other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header>
      {/* Black Promotion Bar */}
      <div className="w-full bg-black text-white text-center py-2 text-sm">
        <p>
          Build Better. Build Smarter | Our New RTX 5080 Just Dropped!{" "}
          <Link href="#" className="font-bold">
            Build Now
          </Link>
        </p>
      </div>

      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Mobile Navigation Bar */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-3 mt-8 pl-6">
                  <Link href="/" className="text-lg font-medium">Home</Link>
                  <Link href="/contact" className="text-lg font-medium">Contact</Link>
                  <Link href="/about" className="text-lg font-medium">About</Link>
                  {!isLoggedIn && (
                    <Link href="/signup" className="text-lg font-medium">Sign Up</Link>
                  )}
                  {isLoggedIn && (
                    <button 
                      onClick={handleLogout}
                      className="text-lg font-medium text-left text-red-500 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              PC Builder
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link href="/contact" className="hover:text-gray-600">
                Contact
              </Link>
              <Link href="/about" className="hover:text-gray-600">
                About
              </Link>
              {!isLoggedIn && (
                <Link href="/signup" className="hover:text-gray-600">
                  Sign Up
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-gray-100 rounded-md py-2 px-4 pr-10 w-64"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/account" className="p-2">
                  <User className="h-6 w-6" />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-red-500 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2">
                <User className="h-6 w-6" />
              </Link>
            )}
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;