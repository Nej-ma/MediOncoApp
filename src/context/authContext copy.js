// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from '../features/authentication/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AuthService.isAuthenticated();
            if (token) {
                const userInfo = await AuthService.getStoredUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                    setIsLoggedIn(true);
                } else {
                    // If no user info is stored, attempt to fetch it
                    try {
                        const freshUserInfo = await AuthService.getUserInfo(token);
                        setUser(freshUserInfo);
                        setIsLoggedIn(true);
                    } catch (error) {
                        console.log('Failed to fetch user info:', error);
                    }
                }
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        };
        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const authResponse = await AuthService.authenticate(username, password);
            if (authResponse.success) {
                const userInfo = await AuthService.getUserInfo(authResponse.token);
                setUser(userInfo);
                setIsLoggedIn(true);
                setLoginError('');
            } else {
                setIsLoggedIn(false);
                setLoginError(authResponse.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setIsLoggedIn(false);
            setLoginError('Login failed due to an error');
        }
        setLoading(false);
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            setIsLoggedIn(false);
            await AuthService.clearUserInfo();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading, loginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
