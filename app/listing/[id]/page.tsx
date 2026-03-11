'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, Star, Clock, User, ArrowLeft, Share, Heart } from 'lucide-react';

// කලින් Home page එකේ තිබ්බ Mock Data ටිකමයි මේ (දැනට Database එකක් නැති නිසා)
const MOCK_LISTINGS = [
    {
        id: "1",
        title: "Sigiriya Rock Fortress Sunrise Tour",
        description: "Experience the breathtaking sunrise from the top of the ancient Sigiriya Rock Fortress. Includes a guided tour of the ruins, frescoes, and a traditional Sri Lankan breakfast at a local village afterwards. Perfect for photography enthusiasts and history lovers.",
        location: "Sigiriya, Sri Lanka",
        price: 45,
        duration: "4 Hours",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1588598198321-983cdfc6ca34?auto=format&fit=crop&q=80&w=1200",
        hostName: "Kamal Perera"
    },
    {
        id: "2",
        title: "Ella Train Journey & Nine Arches",
        description: "Take the world-famous scenic train ride to Ella, followed by a hike to the spectacular Nine Arches Bridge and Little Adam's Peak. We will arrange your train tickets and provide a knowledgeable guide for the hiking portion.",
        location: "Ella, Sri Lanka",
        price: 35,
        duration: "6 Hours",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1546872006-407b4614eec4?auto=format&fit=crop&q=80&w=1200",
        hostName: "Nimali Silva"
    },
    {
        id: "3",
        title: "Yala National Park Safari",
        description: "An adventurous 4x4 jeep safari in Yala National Park. Spot leopards, elephants, and exotic birds in their natural habitat. Includes hotel pickup, entrance fees, and a professional wildlife tracker.",
        location: "Yala, Sri Lanka",
        price: 85,
        duration: "Half Day",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1620958189578-1b2b80a2b534?auto=format&fit=crop&q=80&w=1200",
        hostName: "Saman Kumara"
    },
    {
        id: "4",
        title: "Traditional Cooking Class",
        description: "Learn to cook authentic Sri Lankan rice and curry in a traditional village kitchen using fresh clay pots and organic ingredients. You'll go to the local market to buy ingredients, cook 5 different curries, and enjoy the meal together.",
        location: "Galle, Sri Lanka",
        price: 25,
        duration: "3 Hours",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=1200",
        hostName: "Amara Menike"
    }
];

export default function ListingDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    // URL එකෙන් ආපු ID එකට ගැලපෙන අත්දැකීම හොයනවා
    const listing = MOCK_LISTINGS.find((item) => item.id === id);

    // වැරදි ID එකක් දුන්නොත් පෙන්වන පිටුව
    if (!listing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Not Found</h2>
                <p className="text-gray-500 mb-8">The travel experience you are looking for does not exist or has been removed.</p>
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Go Back Home
                </Link>
            </div>
        );
    }

    // හරි ID එකක් නම් සම්පූර්ණ විස්තරය පෙන්වනවා
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to listings
            </Link>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        {listing.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {listing.rating} Rating</span>
                        <span className="flex items-center gap-1 text-blue-600"><MapPin className="w-4 h-4" /> {listing.location}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors tooltip">
                        <Share className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Large Image */}
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-lg">
                <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column (Description & Host) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Host Info */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Hosted by {listing.hostName}</h3>
                            <p className="text-sm text-gray-500">Experienced Local Guide</p>
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About this experience</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {listing.description}
                        </p>
                    </div>
                </div>

                {/* Right Column (Booking/Price Card) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-3xl font-extrabold text-gray-900">${listing.price}</span>
                            <span className="text-gray-500 font-medium mb-1">/ person</span>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">Duration: {listing.duration}</span>
                            </div>
                        </div>

                        <button className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5">
                            Book Experience
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
                    </div>
                </div>

            </div>
        </div>
    );
}