'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  admin: {
    first_name: string;
    last_name: string;
    email: string;
  };
  report_history: {
    id: number;
    category: string;
    description: string;
    severity: string;
    location: string;
    date?: string;
  }[];
  stats: {
    total_reports_count: number;
    this_month_count: number;
    today_count: number;
  };
  success: boolean;
};


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {

            const token = localStorage.getItem('accessToken');
            if (!token) return router.push('/');

            try {

                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${baseUrl}/api/dashboard`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });


                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    router.push('/');
                    return;
                }

                const data = await res.json();
                setUser(data);
                console.log('protectedRoute', data)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || 'Something went wrong');
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    color: '#208971', // tailwind: text-gray-600
                }}
            >
                Loading . . .
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center',
                }}
            >
                <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{error}</p>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        backgroundColor: '#208971', // tailwind: bg-blue-500
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // 🟢 Provide user to children via Context
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const UserContext = React.createContext<User | null>(null);

export default ProtectedRoute;
