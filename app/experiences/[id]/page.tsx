'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, User, ArrowLeft, Share, Heart, Loader2, Star, Calendar, ShieldCheck } from 'lucide-react';

interface Experience {
    _id: string;
    title: string;
    location: string;
    image_url: string;
    description: string;
    price: number;
    duration?: string;
    rating?: number;
}

export default function ListingDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [listing, setListing] = useState<Experience | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`);
                const result = await response.json();
                setListing(result.data || result);
            } catch (error) {
                console.error("Error fetching experience details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500 font-medium">Preparing your experience...</p>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Oops!</h2>
                    <p className="text-gray-500 mb-8">This experience seems to have vanished into thin air.</p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                        Explore Other Experiences
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-6 pb-20">
            {/* 🌟 Main Container - හැමදේම මේක ඇතුලට දැම්මා පළල අඩු කරන්න */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Navigation / Back Button */}
                <div className="mb-6 flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to experiences
                    </Link>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors text-sm">
                            <Share className="w-4 h-4" /> <span className="hidden sm:block">Share</span>
                        </button>
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors text-sm"
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            <span className="hidden sm:block">{isLiked ? 'Saved' : 'Save'}</span>
                        </button>
                    </div>
                </div>

                {/* Title & Location (පින්තූරයට උඩින් දැම්මා) */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
                        {listing.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium text-gray-600">
                        <span className="flex items-center gap-1 text-gray-900 font-bold">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            {listing.rating || '4.9'} <span className="font-normal underline text-gray-500 ml-1">(120 reviews)</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            {listing.location}
                        </span>
                    </div>
                </div>

                {/* 🌟 Constrained Image - පළල අඩු කරලා රවුම් කළ පින්තූරය */}
                <div className="w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden mb-12 shadow-md bg-gray-100">
                    <img
                        src={listing.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                        alt={listing.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* 🌟 Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Info Bar */}
                        <div className="flex flex-wrap gap-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Clock className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Duration</p>
                                    <p className="font-bold text-gray-900">{listing.duration || 'Flexible Time'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-teal-50 rounded-xl text-teal-600"><Calendar className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Availability</p>
                                    <p className="font-bold text-gray-900">Available Today</p>
                                </div>
                            </div>
                        </div>

                        {/* Host Info */}
                        <div className="flex items-center justify-between py-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Hosted by Local Guide</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <ShieldCheck className="w-4 h-4 text-green-500" /> Identity Verified
                                    </p>
                                </div>
                            </div>
                            <button className="hidden sm:block px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-900 transition-all">
                                Contact Host
                            </button>
                        </div>

                        {/* Description */}
                        <div className="pt-2">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">About this experience</h2>
                            <div className="prose max-w-none text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                {listing.description}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Booking Card) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl md:text-4xl font-black text-gray-900">${listing.price}</span>
                                <span className="text-gray-500 font-medium">/ person</span>
                            </div>

                            {/* Booking form mockup */}
                            <div className="border border-gray-300 rounded-2xl mb-6 overflow-hidden">
                                <div className="grid grid-cols-2 border-b border-gray-300">
                                    <div className="p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1">Check-in</label>
                                        <div className="text-sm text-gray-500">Add date</div>
                                    </div>
                                    <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1">Check-out</label>
                                        <div className="text-sm text-gray-500">Add date</div>
                                    </div>
                                </div>
                                <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1">Guests</label>
                                    <div className="text-sm text-gray-900">1 guest</div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base md:text-lg font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
                                Book Experience
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4 font-medium">
                                You won't be charged yet
                            </p>

                            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center text-gray-900 font-bold text-lg">
                                <span>Total before taxes</span>
                                <span>${listing.price}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}