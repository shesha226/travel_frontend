'use client'; // මේක Client Component එකක් නිසා මේක අනිවාර්යයි

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function CreateListingButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Hydration error එකක් එන එක නවත්තන්න loading state එකක් තියාගමු
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // කලින් අපි සේව් කරපු Token එක තියෙනවද බලනවා
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Page එක මුලින්ම ලෝඩ් වෙද්දී මුකුත් පෙන්නන්නේ නෑ
    if (!isMounted) return null;

    // ලොග් වෙලා නැත්නම් මුකුත් පෙන්නන්නේ නෑ
    if (!isLoggedIn) return null;

    // ලොග් වෙලා නම් මේ Button එක පෙන්නනවා
    return (
        <Link
            href="/create-listing"
            className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
            <Plus className="w-5 h-5" />
            Create Listing
        </Link>
    );
}