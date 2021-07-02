import React, { useContext, createContext, useState, useCallback } from 'react';
import { UserContextType, UserContextData } from '../Types/Contexts/User';

const UserContext = createContext<(UserContextType)>({} as UserContextType);

function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<UserContextData>();
  const SetUser = (dados: UserContextData) => setUser(dados);

  return (
    <UserContext.Provider value={{ SetUser, user }}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
}

export { useUserContext, UserContextProvider };