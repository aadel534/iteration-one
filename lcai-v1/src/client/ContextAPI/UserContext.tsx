import React, { createContext, useState, useContext, ReactNode } from 'react';
// Source: https://www.typescriptlang.org/docs/handbook/2/objects.html Typescript interfaces
//Type must be specified for UserContextValue, this defines its structure 
interface UserContextValue {
  userId: string | null;
  firstName: string | null;
  login: (userId: string) => void;
  navbarname: (firstName: string) => void;
}

// Source: https://react.dev/reference/react/createContext
// Default values for context
const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Store user id 
  const [userId, setUserId] = useState<string | null>(null);
  // Store user first name
  const [firstName, setNavBarName] = useState<string | null>(null);

  // Logging in a user - store userId to share across components
  const login = (userId: string) => {
    setUserId(userId);
  };

    // E.g. to display "Hello Adelayo!"  on dashboard
  const navbarname = (firstName: string) => {
    setNavBarName(firstName);

  }

 
  // Create object with these attributes and methods
  const contextValue: UserContextValue = { userId, firstName, navbarname, login };

  // Source: // Source: https://react.dev/reference/react/createContext
  // Share the contextValue object with children of UserContext.Provider
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Source: https://react.dev/reference/react/createContext
// Access UserContext attributes and methods in components using a custom hook
export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
