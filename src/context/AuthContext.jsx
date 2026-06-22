import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('rhythmix_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const signIn = (email, password) => {
    // For demo purposes - in a real app, this would call an API
    const mockUser = {
      id: 'user1',
      name: 'Demo User',
      email,
      avatar: 'https://i.pravatar.cc/300?img=8'
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('rhythmix_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signUp = (name, email, password) => {
    // For demo purposes - in a real app, this would call an API
    const mockUser = {
      id: 'user1',
      name,
      email,
      avatar: 'https://i.pravatar.cc/300?img=8'
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('rhythmix_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('rhythmix_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};