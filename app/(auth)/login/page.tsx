'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Loader2 } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setLoginError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();


            if (!response.ok) {
                setLoginError(responseData.message || 'Invalid email or password.');
                setIsLoading(false);
                return;
            }


            const token = responseData.token || responseData.data?.token;

            if (token) {
                localStorage.setItem('token', token);

                window.location.href = "/";
            } else {
                setLoginError("Login failed: Token not received.");
            }

        } catch (error: any) {
            setLoginError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-500">Please sign in to your account.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {loginError && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 text-center">
                            {loginError}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input {...register('email')} type="email" placeholder="you@example.com"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-600 outline-none" />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input {...register('password')} type="password" placeholder="••••••••"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-600 outline-none" />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all shadow-md">
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <Link href="/register" className="font-medium text-blue-600 hover:underline">Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}