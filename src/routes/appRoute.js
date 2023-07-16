import {useEffect, useState } from "react";
import AuthRoute from "./authRoute";
import HomeRoute from "./homeRoute";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AppRoute() {


  const [user, setUser] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the onAuthStateChanged listener
    return () => unsubscribe();
  }, []);
  return (
    <>
      {
        user ? (
          <HomeRoute />
        ) : (
          <AuthRoute />
        )
      
      }
    </>
  );
}


