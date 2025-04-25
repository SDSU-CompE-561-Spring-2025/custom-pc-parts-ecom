import React from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
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
                  <Link href="/pages/contact" className="text-lg font-medium">Contact</Link>
                  <Link href="/pages/about" className="text-lg font-medium">About</Link>
                  <Link href="/pages/signup" className="text-lg font-medium">Sign Up</Link>
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
              <Link href="/pages/contact" className="hover:text-gray-600">
                Contact
              </Link>
              <Link href="/pages/about" className="hover:text-gray-600">
                About
              </Link>
              <Link href="/pages/signup" className="hover:text-gray-600">
                Sign Up
              </Link>
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
            <Link href="/account" className="p-2">
              <User className="h-6 w-6" />
            </Link>
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