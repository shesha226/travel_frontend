'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Search, SlidersHorizontal, Loader2 } from 'lucide-react';

interface Experience {
  _id: string;
  title: string;
  location: string;
  image_url: string;
  description: string;
  price: number;
  duration?: string;
  createdAt: string;
}

function getTimeAgo(dateString: string) {
  if (!dateString) return "Just now";
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();

  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${diffInDays}d ago`;
}

function ExperienceCard({ data }: { data: Experience }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={data.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-tight">
            {getTimeAgo(data.createdAt)}
          </span>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
          ${data.price}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-400 text-xs mb-2 gap-1 font-medium uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-black font-semibold">{data.location}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {data.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {data.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-center text-gray-500 text-xs gap-1 font-medium">
            <Clock className="h-3.5 w-3.5 text-teal-500" />
            <span className="text-black">{data.duration || 'Flexible'}</span>
          </div>


          <Link
            href={`/experiences/${data._id}`}
            className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors cursor-pointer"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
  const [filteredData, setFilteredData] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`);
        const result = await response.json();

        let finalArray: Experience[] = [];

        if (result.experiences) finalArray = result.experiences;
        else if (result.data && result.data.experiences) finalArray = result.data.experiences;
        else if (Array.isArray(result.data)) finalArray = result.data;
        else if (Array.isArray(result)) finalArray = result;

        if (finalArray.length > 0) {
          const sorted = [...finalArray].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setAllExperiences(sorted);
          setFilteredData(sorted);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    const filtered = allExperiences.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = maxPrice === '' || exp.price <= Number(maxPrice);
      return matchesSearch && matchesPrice;
    });
    setFilteredData(filtered);
  }, [searchTerm, maxPrice, allExperiences]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search & Filter UI */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal className="h-5 w-5 text-gray-500 hidden md:block" />
            <input
              type="number"
              placeholder="Max Price ($)"
              className="w-full md:w-40 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Experiences</h2>
          <p className="text-sm text-gray-500 font-medium">Showing {filteredData.length} items</p>
        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((exp) => (
              <ExperienceCard key={exp._id} data={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No experiences found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}