import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('ttm-novels-user');
    const savedIsAdmin = localStorage.getItem('ttm-novels-isAdmin');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setIsAdmin(savedIsAdmin === 'true');
    }
  }, []);

  const login = (username, isAdminUser = false, additionalData = {}) => {
    const userData = {
      username,
      loginTime: new Date().toISOString(),
      ...additionalData,
    };

    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);

    // Save to localStorage
    localStorage.setItem('ttm-novels-user', JSON.stringify(userData));
    localStorage.setItem('ttm-novels-isAdmin', isAdminUser.toString());
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    // Clear localStorage
    localStorage.removeItem('ttm-novels-user');
    localStorage.removeItem('ttm-novels-isAdmin');
  };

  const value = {
    isAuthenticated,
    user,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
