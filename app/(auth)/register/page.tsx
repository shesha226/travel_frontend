'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Lock, Loader2, UserPlus, Phone, CreditCard } from 'lucide-react';


const registerSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    contact_number: z.string()
        .min(10, { message: "Contact number must be at least 10 characters." })
        .max(20, { message: "Contact number cannot exceed 20 characters." })
        .regex(/^[\d\s\-\+\(\)]+$/, { message: "Invalid contact number format." }),
    nic: z.string()
        .min(10, { message: "NIC must be at least 10 characters." })
        .max(12, { message: "NIC cannot exceed 12 characters." })
        .regex(/^[a-zA-Z0-9]+$/, { message: "NIC can only contain letters and numbers." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "Must contain at least one lowercase, one uppercase, and one number." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setRegisterError('');

        try {

            const userData = {
                name: data.name,
                email: data.email,
                contact_number: data.contact_number,
                nic: data.nic,
                password: data.password
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || responseData.error || 'Registration failed. Please try again.');
            }

            alert("Registration Successful! Please login.");
            router.push('/login');

        } catch (error: any) {
            console.error("Registration Error:", error);
            setRegisterError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Join us to discover and share amazing travel experiences.
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {registerError && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 text-center">
                            {registerError}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('name')} type="text" placeholder="John Doe"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('email')} type="email" placeholder="you@example.com"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('contact_number')} type="text" placeholder="0771234567"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.contact_number ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.contact_number && <p className="mt-1 text-sm text-red-600">{errors.contact_number.message}</p>}
                        </div>

                        {/* NIC */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('nic')} type="text" placeholder="951234567V / 199512345678"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.nic ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.nic && <p className="mt-1 text-sm text-red-600">{errors.nic.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('password')} type="password" placeholder="••••••••"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input {...register('confirmPassword')} type="password" placeholder="••••••••"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-600 sm:text-sm`} />
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all shadow-md mt-6">
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><UserPlus className="mr-2 h-5 w-5 opacity-70" /> Create Account</>}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline">Log in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}