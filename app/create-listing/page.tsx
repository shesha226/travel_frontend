'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, Clock, User, ArrowLeft, Share, Heart, Loader2, Star, Calendar } from 'lucide-react';

export default function ListingDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [listing, setListing] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`);
                const result = await response.json();
                setListing(result.data || result);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-bold text-blue-600">
                <Loader2 className="animate-spin mr-2" /> Loading Details...
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Not Found</h2>
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700">
                    Go Back Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to listings
            </Link>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        {listing.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {listing.rating || '4.9'} Rating</span>
                        <span className="flex items-center gap-1 text-blue-600"><MapPin className="w-4 h-4" /> {listing.location}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"><Share className="w-5 h-5" /></button>
                    <button className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"><Heart className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-lg">
                <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><User className="w-7 h-7" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Hosted by {listing.hostName || 'Local Guide'}</h3>
                            <p className="text-sm text-gray-500">Experienced Local Guide</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About this experience</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{listing.description}</p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-3xl font-extrabold text-gray-900">${listing.price}</span>
                            <span className="text-gray-500 font-medium mb-1">/ person</span>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">Duration: {listing.duration || '4 Hours'}</span>
                            </div>
                        </div>
                        <button className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform active:scale-95">
                            Book Experience
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
}