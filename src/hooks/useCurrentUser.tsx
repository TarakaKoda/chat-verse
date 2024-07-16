'use client'

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, fetchUsers } from '@/lib/firebase';


const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    fetchUsers((usersList) => {
      if (currentUser) {
        setUsers(usersList.filter((user) => user.id !== currentUser.uid));
      } else {
        setUsers(usersList);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeAuth();
    };
  }, [currentUser]);

  return { users, currentUser };
};

export default useUsers;
