import React from "react";
import Link from "next/link";
import  { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
    return (
        <header>
            {/* Black Promotion Bar */}
            <div className="bg-black text-white py-2 px-4 flex items-center">
                <span className="text-sm">Build Smarter Build Stronger | Limited edtion RTX 5090 Available</span>
                <Button variant="link" className="text-sm text-white">Build Now</Button>
            </div>

            <div className="py-6 px-6 flex justify-between items-center border-b">
            {/* Mobile Navigation Bar */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <nav className="flex flex-col gap-3 mt-8 pl-6">
                            <Link href="/" className="text-lg font-medium">Home</Link>
                            <Link href="/contact" className="text-lg font-medium">Contact</Link>
                            <Link href="/about" className="text-lg font-medium">About</Link>
                            <Link href="/user" className="text-lg font-medium">User</Link>
                            <Link href="/signup" className="text-lg font-medium">Sign up</Link>
                        </nav>
                    </SheetContent>
                </Sheet>            
            </div>

            {/* Logo */}
            <Link href={"/"} className="text-xl font-bold">PC Builder</Link>

            {/* Desktop Navigation Bar */}
            <div className ="hidden lg:block">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" className="text-lg font-medium">Home</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" className="text-lg font-medium">Contact</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" className="text-lg font-medium">About</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/user" className="text-lg font-medium">User</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/signup" className="text-lg font-medium">Sign up</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex relative items-center w-64 mx-4">
            <Input placeholder="What are you looking for?" className="pr-10 w-full rounded-md" />
            <Search className="absolute right-4" size={20} />
            </div>

            {/* Icon */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <ShoppingCart size={20}/>
                </Button>
                <Button variant="ghost" size="icon">
                    <User size={20}/>
                </Button>
            </div>
            </div>
        </header>
    );
};

export default Navbar;

