'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            setToken(savedToken);
            fetchUser(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch current user profile
    const fetchUser = async (authToken) => {
        try {
            const res = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
                setToken(authToken);
            } else {
                // Token expired or invalid
                logout();
            }
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (email, password, redirectPath = '/') => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!data.success) {
            throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('auth_token', data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
        router.push(redirectPath);
        return data.data;
    };

    // Register
    const register = async (email, name, password, redirectPath = '/') => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password }),
        });
        const data = await res.json();

        if (!data.success) {
            throw new Error(data.error || 'Registration failed');
        }

        localStorage.setItem('auth_token', data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
        router.push(redirectPath);
        return data.data;
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
