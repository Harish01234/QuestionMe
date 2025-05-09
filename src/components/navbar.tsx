'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { data: session } = useSession();  // Access session data
    

    const handleLogout = () => {
        signOut( { callbackUrl: '/' });
        console.log("signed out");
       

    };

    return (
        <nav className="w-full flex justify-between items-center px-6 py-3 bg-second shadow-md fixed top-0 z-50">
            {/* Logo */}
            <div>
                <Image
                    src="/questionme2.png"
                    alt="Logo"
                    width={63}
                    height={34}
                    priority
                />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                <Link href="/" className="text-first hover:text-third transition text-lg">Home</Link>
                <Link href="/about" className="text-first hover:text-third transition text-lg">About</Link>
                <Link href="/interviews" className="text-first hover:text-third transition text-lg">Interviews</Link>
                <Link href="/contact" className="text-first hover:text-third transition text-lg">Contact</Link>
                {/* Conditional Rendering of the Login/Logout button */}
                {session ? (
                    <button
                        onClick={handleLogout}
                        className="bg-third text-white rounded-full px-5 py-2 hover:scale-105 transition duration-300 shadow-md"
                    >
                        Logout
                    </button>
                ) : (
                    <Link href="/auth">
                        <button className="bg-third text-white rounded-full px-5 py-2 hover:scale-105 transition duration-300 shadow-md">
                            Login
                        </button>
                    </Link>
                )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isOpen ? <X className="w-6 h-6 text-first" /> : <Menu className="w-6 h-6 text-first" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-second text-first px-6 py-4 z-50 space-y-3 shadow-md md:hidden">
                    <Link href="/" className="block hover:text-third text-lg" onClick={toggleMenu}>Home</Link>
                    <Link href="/about" className="block hover:text-third text-lg" onClick={toggleMenu}>About</Link>
                    <Link href="/interviews" className="block hover:text-third text-lg" onClick={toggleMenu}>Interviews</Link>
                    <Link href="/contact" className="block hover:text-third text-lg" onClick={toggleMenu}>Contact</Link>
                    {/* Conditional Rendering of the Login/Logout button in mobile menu */}
                    {session ? (
                        <button
                            onClick={handleLogout}
                            className="bg-third text-white rounded-full px-5 py-2 hover:scale-105 transition duration-300 shadow-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/auth">
                            <button className="bg-third text-white rounded-full px-5 py-2 hover:scale-105 transition duration-300 shadow-md">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
