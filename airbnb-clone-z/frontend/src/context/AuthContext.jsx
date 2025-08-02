import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, updateProfile } from '../services/auth';
// Create the auth context
const AuthContext = createContext();
// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // On mount, check if there's a current user
  useEffect(() => {
    const initAuth = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    initAuth();
  }, []);
  // Sign in function
  const login = async (email, password) => {
    try {
      const user = await signIn(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  // Sign up function
  const signup = async (email, password, name) => {
    try {
      const user = await signUp(email, password, name);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  // Sign out function
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };
  // Update user profile
  const updateUserProfile = async (userData) => {
    try {
      const updatedUser = await updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  // Context value
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUserProfile
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};