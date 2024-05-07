import React, { createContext, useState, useContext, ReactNode } from 'react';

//Type must be specified for UseContextValue
interface UserContextValue {
  userId: string | null;
  firstName: string | null;
  login: (userId: string) => void;
  navbarname: (firstName: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setNavBarName] = useState<string | null>(null);

  const login = (userId: string) => {
    setUserId(userId);
  };

  const navbarname = (firstName: string) => {
    // E.g. to display "Logout Adelayo?" 
    setNavBarName(firstName);

  }

  const logout = () => {
    setUserId(null);
    setNavBarName(null);
  };

  const contextValue: UserContextValue = { userId, firstName, navbarname, login, logout };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
