import Link from 'next/link';
import { MapPin, DollarSign, Star, Clock } from 'lucide-react';

// Card එකට එන්න ඕන දත්ත මොනවද කියලා මෙතනින් කියනවා (TypeScript Interface)
interface ListingProps {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    imageUrl: string;
    duration: string;
    rating: number;
}

export default function ListingCard({
    id,
    title,
    description,
    location,
    price,
    imageUrl,
    duration,
    rating
}: ListingProps) {
    return (
        <Link href={`/listing/${id}`} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">

                {/* පින්තූරය පෙන්වන කොටස */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-700">{rating}</span>
                    </div>
                </div>

                {/* විස්තර ටික පෙන්වන කොටස */}
                <div className="p-5">
                    <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-medium uppercase tracking-wider">{location}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            {duration}
                        </div>
                        <div className="flex items-center text-lg font-extrabold text-gray-900">
                            <DollarSign className="w-5 h-5 text-teal-500" />
                            {price}
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}