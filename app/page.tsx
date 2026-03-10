import ListingCard from "./components/listings/ListingCard";
import { Compass } from "lucide-react";

// Database එක හදනකම් පෙනුම බලාගන්න අපි හදාගත්ත බොරු දත්ත (Mock Data)
const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Sigiriya Rock Fortress Sunrise Tour",
    description: "Experience the breathtaking sunrise from the top of the ancient Sigiriya Rock Fortress. Includes a guided tour of the ruins and frescoes.",
    location: "Sigiriya, Sri Lanka",
    price: 45,
    duration: "4 Hours",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1588598198321-983cdfc6ca34?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Ella Train Journey & Nine Arches",
    description: "Take the world-famous scenic train ride to Ella, followed by a hike to the spectacular Nine Arches Bridge and Little Adam's Peak.",
    location: "Ella, Sri Lanka",
    price: 35,
    duration: "6 Hours",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1546872006-407b4614eec4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Yala National Park Safari",
    description: "An adventurous 4x4 jeep safari in Yala National Park. Spot leopards, elephants, and exotic birds in their natural habitat.",
    location: "Yala, Sri Lanka",
    price: 85,
    duration: "Half Day",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1620958189578-1b2b80a2b534?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Traditional Cooking Class",
    description: "Learn to cook authentic Sri Lankan rice and curry in a traditional village kitchen using fresh clay pots and organic ingredients.",
    location: "Galle, Sri Lanka",
    price: 25,
    duration: "3 Hours",
    rating: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3 flex items-center justify-center md:justify-start gap-3">
          <Compass className="w-10 h-10 text-blue-600" />
          Discover Experiences
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Explore unique travel experiences hosted by passionate local experts around the country.
        </p>
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_LISTINGS.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            description={listing.description}
            location={listing.location}
            price={listing.price}
            imageUrl={listing.imageUrl}
            duration={listing.duration}
            rating={listing.rating}
          />
        ))}
      </div>

      {/* No listings state (just in case the array is empty) */}
      {MOCK_LISTINGS.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No experiences available right now. Check back later!</p>
        </div>
      )}

    </div>
  );
}