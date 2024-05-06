import React, { createContext, useState, useContext, ReactNode } from 'react';

//Type must be specified for UseContextValue
interface UserContextValue {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const login = (userId: string) => {
    setUserId(userId);
  };

  const logout = () => {
    setUserId(null);
  };

  const contextValue: UserContextValue = { userId, login, logout };

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
