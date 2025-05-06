"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { isAuthenticated, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useSearch } from "@/components/SearchContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { searchQuery, searchResults, isSearching, setSearchQuery, clearSearch } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check authentication status on component mount and when localStorage changes
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    // Check initially
    checkAuthStatus();

    // Listen for storage events (login/logout in other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    // Add click event listener to close search results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show results when we have a search query
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setShowResults(true);
    }
  }, [searchQuery, searchResults]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleProductClick = (productId: number | string, category: string) => {
    // Navigate to product page
    const id = typeof productId === 'string' ? parseInt(productId) : productId;
    router.push(`/category/${category}/${id}`);
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
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
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="bg-gray-100 rounded-full py-2 px-4 pr-12 w-64 border border-gray-300"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto border">
                  {searchResults.slice(0, 5).map((product) => (
                    <div
                      key={`${product.category}-${product.id}`}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleProductClick(product.id, product.category as string)}
                    >
                      <div className="h-16 w-16 mr-4 flex-shrink-0 bg-gray-100 rounded">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-contain rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-500">
                          {product.category?.replace(/-/g, ' ')}
                          </p>
                        <p className="font-semibold mt-1">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {searchResults.length > 5 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block text-center py-2 text-blue-600 hover:bg-gray-50 border-t"
                      onClick={() => setShowResults(false)}
                    >
                      View all {searchResults.length} results
                    </Link>
                  )}
                </div>
              )}

              {/* No Results Message */}
              {showResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border p-4">
                  <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}
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