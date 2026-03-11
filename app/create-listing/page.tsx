'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, DollarSign, Image as ImageIcon, FileText, Type, Clock, Loader2, Send } from 'lucide-react';

// Form එකේ දත්ත validate කරන Zod Schema එක
const listingSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    location: z.string().min(3, { message: "Location is required." }),
    description: z.string().min(20, { message: "Description must be at least 20 characters." }),

    // මෙන්න මේක z.string() කරන්න
    price: z.string().min(1, { message: "Price is required." }),

    duration: z.string().min(2, { message: "Duration is required (e.g., 3 Hours)." }),
    imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function CreateListingPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ListingFormValues>({
        resolver: zodResolver(listingSchema),
    });

    const onSubmit = async (data: ListingFormValues) => {
        setIsLoading(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            // මෙතනදී අපි price එක Number එකක් බවට පත් කරලා අලුත් Object එකක් හදාගන්නවා
            const finalDataToSubmit = {
                ...data,
                price: Number(data.price)
            };

            // දැන් බලන්න finalDataToSubmit එකේ price එක නියම ඉලක්කමක් විදියට තියෙනවා!
            console.log('New Listing Data:', finalDataToSubmit);

            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitMessage({ type: 'success', text: 'Experience created successfully! Redirecting...' });

            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1000);

        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'Failed to create listing. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">

                {/* Header */}
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Host an Experience</h1>
                    <p className="mt-2 text-gray-500 text-sm">
                        Share your unique travel experience with the world. Fill out the details below to publish your listing.
                    </p>
                </div>

                {/* Create Listing Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {submitMessage.text && (
                        <div className={`p-4 rounded-lg text-sm font-medium ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {submitMessage.text}
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Title</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Type className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register('title')}
                                type="text"
                                placeholder="e.g., Sunrise Safari at Yala National Park"
                                className={`block w-full pl-10 pr-3 py-2.5 border ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                            />
                        </div>
                        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register('location')}
                                    type="text"
                                    placeholder="e.g., Yala, Sri Lanka"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                                />
                            </div>
                            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register('duration')}
                                    type="text"
                                    placeholder="e.g., 4 Hours"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.duration ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                                />
                            </div>
                            {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration.message}</p>}
                        </div>
                    </div>

                    {/* Price & Image URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (USD)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register('price')}
                                    type="number"
                                    placeholder="0.00"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                                />
                            </div>
                            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register('imageUrl')}
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.imageUrl ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                                />
                            </div>
                            {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                {...register('description')}
                                rows={5}
                                placeholder="Describe what makes this experience special..."
                                className={`block w-full pl-10 pr-3 py-2.5 border ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors sm:text-sm resize-none`}
                            />
                        </div>
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="mr-2 h-5 w-5" />
                                    Publish Experience
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}