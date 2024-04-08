import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from '../features/authentication/services/authService'; // Adjust the import path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AuthService.verifyToken();
            setIsLoggedIn(token !== false);
    
            if (token) {
                const userInfo = await AuthService.getStoredUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                }
            } else {
                setUser(null);
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
        await AuthService.logout();
        setUser(null);
        setIsLoggedIn(false);
        setLoginError('');
    };

    const changePassword = async (userId, currentPassword, newPassword) => {
        console.log("changePassword",userId, currentPassword, newPassword);
        try {
          const response = await AuthService.changePassword(userId, currentPassword, newPassword);
          console.log("response",response);
          if (response.success) {
            // Optionally update local user state or perform other actions as needed
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error changing password:', error);
          return false;
        }
      };
      

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading, loginError, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
