import React,  {ReactNode} from 'react';
import { UserProvider } from './UserContext.tsx';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}
const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default AuthenticatedLayout;
