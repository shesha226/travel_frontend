'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PlusCircle, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                            TravelX
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/create-listing"
                                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create Listing
                                </Link>
                                <div className="h-6 w-px bg-gray-200"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>

                                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                    } overflow-hidden`}
            >
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/create-listing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Create Listing
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-3 mt-2 rounded-lg text-base font-semibold text-center text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}