import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, logoutUser } from '../services/firebase';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Clear file data when user changes
      if (!user) {
        setFileData([]);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Custom logout function that clears file data
  const logout = async () => {
    try {
      // Clear file data before logging out
      setFileData([]);
      await logoutUser();
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  // Context values to be provided
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    fileData,
    setFileData,
    logout,
    getUserId: () => currentUser?.uid || null
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);