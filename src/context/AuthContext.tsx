import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile, UserRole, DemoAccount } from '../types';
import { DEMO_ACCOUNTS, INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole, dept: string) => Promise<void>;
  loginAsDemo: (demoEmail: string) => void;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  switchRole: (role: UserRole) => void;
  demoAccounts: DemoAccount[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    // Default start with Aarav Sharma (Student) for immediate demonstration
    const savedUser = localStorage.getItem('cc_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
    return INITIAL_USERS[0]; // Student Aarav Sharma
  });

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data() as UserProfile;
            setCurrentUser(userData);
            localStorage.setItem('cc_current_user', JSON.stringify(userData));
          }
        } catch (err) {
          console.warn('Firestore fetch failed, keeping local session:', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Check if matching a demo account first
    const matchedDemo = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedDemo) {
      setCurrentUser(matchedDemo);
      localStorage.setItem('cc_current_user', JSON.stringify(matchedDemo));
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        console.log('Firebase Auth bypass for demo login');
      }
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', cred.user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const uData = docSnap.data() as UserProfile;
        setCurrentUser(uData);
        localStorage.setItem('cc_current_user', JSON.stringify(uData));
      } else {
        const fallbackProfile: UserProfile = {
          uid: cred.user.uid,
          email: cred.user.email || email,
          name: email.split('@')[0],
          role: 'student',
          department: 'Computer Science & Engineering'
        };
        setCurrentUser(fallbackProfile);
        localStorage.setItem('cc_current_user', JSON.stringify(fallbackProfile));
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to sign in');
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole, department: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const newUser: UserProfile = {
        uid: cred.user.uid,
        email,
        name,
        role,
        department,
        joinedYear: new Date().getFullYear().toString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      };
      
      await setDoc(doc(db, 'users', cred.user.uid), newUser);
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
    } catch (err: any) {
      // If Firebase auth throws (e.g. offline or email exists), support direct demo user creation
      const newUser: UserProfile = {
        uid: 'user-' + Date.now(),
        email,
        name,
        role,
        department,
        joinedYear: new Date().getFullYear().toString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      };
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
    }
  };

  const loginAsDemo = (demoEmail: string) => {
    const demo = INITIAL_USERS.find(u => u.email.toLowerCase() === demoEmail.toLowerCase());
    if (demo) {
      setCurrentUser(demo);
      localStorage.setItem('cc_current_user', JSON.stringify(demo));
    }
  };

  const switchRole = (role: UserRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    localStorage.setItem('cc_current_user', JSON.stringify(updated));
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase logout notice:', e);
    }
    setCurrentUser(null);
    localStorage.removeItem('cc_current_user');
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      throw new Error(err.message || 'Password reset failed');
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    const merged = { ...currentUser, ...updatedData };
    setCurrentUser(merged);
    localStorage.setItem('cc_current_user', JSON.stringify(merged));
    
    try {
      if (firebaseUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), updatedData);
      }
    } catch (e) {
      console.warn('Profile updated locally');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      firebaseUser,
      loading,
      login,
      signup,
      loginAsDemo,
      logout,
      resetPassword,
      updateProfile,
      switchRole,
      demoAccounts: DEMO_ACCOUNTS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
