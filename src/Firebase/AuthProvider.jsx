import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import auth from './firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //email password login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign in with google
  const googleLogin = () => {
    setLoading(true);
    setUser(null);
    return signInWithPopup(auth, googleProvider);
  };
  //sign in with github
  const githubLogin = () => {
    setLoading(true);
    setUser(null);
    return signInWithPopup(auth, githubProvider);
  };

  //update user profile
  const updateUserProfile = (name, profile) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };

  //logOut
  const logOut = async() => {
    const { data } = await axios(
      `https://hotel-hive-server.vercel.app/logout`,
      { withCredentials: true }
    );
    console.log(data)
    signOut(auth).then(() => {
      setUser(null);
      toast.success('Successfully Logged Out');
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const loggedUser = { email: currentUser.email }
        axios
          .post('https://hotel-hive-server.vercel.app/jwt', loggedUser, {
            withCredentials: true,
          })
          .then(res => {
            console.log('token response', res.data);
          });
        }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    googleLogin,
    githubLogin,
    setUser,
    user,
    createUser,
    loginUser,
    logOut,
    loading,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
