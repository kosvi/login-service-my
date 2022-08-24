import React, { useState } from 'react';
import { UserInfo } from '../types/internal';

type UserState = UserInfo | undefined;

export const UserContext = React.createContext<[UserState, React.Dispatch<React.SetStateAction<UserState>>]>([undefined, () => undefined]);

export function UserContextProvider({ children }: { children: React.ReactElement }) {
  const [user, setUser] = useState<UserState>(undefined);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}