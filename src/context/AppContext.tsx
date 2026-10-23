import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenType,
  Member,
  Expense,
  AppNotification,
  RoomDetails,
  UserProfile,
  ExpenseCategory,
  SplitType,
  SplitMemberShare,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_MEMBERS,
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ROOM_DETAILS,
} from '../data/initialData';
import {
  auth,
  db,
  signInWithGoogle,
  signOutUser,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import {
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

export interface DraftExpense {
  title: string;
  amount: number | '';
  date: string;
  category: ExpenseCategory;
  splitWithAll: boolean;
  splitType: SplitType;
  splits: SplitMemberShare[];
  notes?: string;
  paidBy: string;
}

interface AppContextType {
  currentScreen: ScreenType;
  screenHistory: ScreenType[];
  navigate: (screen: ScreenType, options?: { expenseId?: string; resetDraft?: boolean }) => void;
  goBack: () => void;
  user: UserProfile;
  firebaseUser: FirebaseUser | null;
  isFirebaseConnected: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  members: Member[];
  expenses: Expense[];
  notifications: AppNotification[];
  roomDetails: RoomDetails;
  selectedExpenseId: string | null;
  setSelectedExpenseId: (id: string | null) => void;
  draftExpense: DraftExpense;
  setDraftExpense: React.Dispatch<React.SetStateAction<DraftExpense>>;
  updateDraftExpense: (updates: Partial<DraftExpense>) => void;
  resetDraftExpense: () => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => string;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addMember: (name: string, email: string, phone?: string) => void;
  removeMember: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateRoomDetails: (updates: Partial<RoomDetails>) => void;
  resetDemoData: () => void;
  totalMonthlyExpenses: number;
  lastMonthExpenses: number;
  monthlyExpenseTrend: { month: string; amount: number }[];
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[];
  memberBalances: {
    member: Member;
    totalPaid: number;
    totalShare: number;
    netBalance: number;
  }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'room_partner_app_';
const DEFAULT_ROOM_ID = 'room-default-boys-hostel';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>('exp-1');

  // Firebase Auth state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}user`);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}members`);
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}expenses`);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [roomDetails, setRoomDetails] = useState<RoomDetails>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}roomDetails`);
    return saved ? JSON.parse(saved) : INITIAL_ROOM_DETAILS;
  });

  // Draft Expense State
  const getDefaultDraft = (): DraftExpense => ({
    title: '',
    amount: '',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    category: 'Food',
    splitWithAll: true,
    splitType: 'Equal',
    splits: members.map((m) => ({
      memberId: m.id,
      amount: 0,
      selected: true,
    })),
    notes: '',
    paidBy: user.id,
  });

  const [draftExpense, setDraftExpense] = useState<DraftExpense>(getDefaultDraft);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}user`, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}members`, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}expenses`, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}roomDetails`, JSON.stringify(roomDetails));
  }, [roomDetails]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const updatedUser: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || user.name || 'Rohit Yadav',
          email: fbUser.email || user.email || 'rohit2710@gmail.com',
          avatar: fbUser.photoURL || user.avatar,
          isAdmin: true,
        };
        setUser(updatedUser);

        // Also update member list to have current user
        setMembers((prev) => {
          const exists = prev.some((m) => m.id === fbUser.uid || m.email === fbUser.email);
          if (exists) {
            return prev.map((m) =>
              m.id === fbUser.uid || m.email === fbUser.email
                ? {
                    ...m,
                    id: fbUser.uid,
                    name: `${fbUser.displayName || 'You'} (You)`,
                    avatar: fbUser.photoURL || m.avatar,
                  }
                : m
            );
          } else {
            return [
              {
                id: fbUser.uid,
                name: `${fbUser.displayName || 'You'} (You)`,
                email: fbUser.email || '',
                phone: fbUser.phoneNumber || '+91 98765 43210',
                avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                isAdmin: true,
                joinDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              },
              ...prev,
            ];
          }
        });

        // Sync with Firestore if authenticated
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          await setDoc(
            userDocRef,
            {
              id: fbUser.uid,
              name: fbUser.displayName || 'Roommate',
              email: fbUser.email || '',
              avatar: fbUser.photoURL || '',
              currentRoomId: DEFAULT_ROOM_ID,
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Firestore user sync warning:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore expenses when authenticated
  useEffect(() => {
    if (!firebaseUser) return;

    const path = `rooms/${DEFAULT_ROOM_ID}/expenses`;
    const expensesColRef = collection(db, 'rooms', DEFAULT_ROOM_ID, 'expenses');
    const unsub = onSnapshot(
      expensesColRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreExpenses: Expense[] = snapshot.docs.map((d) => ({
            ...(d.data() as Expense),
            id: d.id,
          }));
          setExpenses(firestoreExpenses);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsub();
  }, [firebaseUser]);

  // Auth actions
  const loginWithGoogle = async () => {
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        navigate('home');
      }
    } catch (error) {
      console.error('Google Sign In failed:', error);
      alert('Google Sign-In was cancelled or failed. Please try again.');
    }
  };

  const logoutUser = async () => {
    try {
      await signOutUser();
      navigate('login');
    } catch (error) {
      console.error('Sign Out failed:', error);
    }
  };

  // Navigation handlers
  const navigate = (screen: ScreenType, options?: { expenseId?: string; resetDraft?: boolean }) => {
    if (options?.expenseId) {
      setSelectedExpenseId(options.expenseId);
    }
    if (options?.resetDraft) {
      resetDraftExpense();
    }
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
      setScreenHistory(['home']);
    }
  };

  const updateDraftExpense = (updates: Partial<DraftExpense>) => {
    setDraftExpense((prev) => ({ ...prev, ...updates }));
  };

  const resetDraftExpense = () => {
    setDraftExpense({
      title: '',
      amount: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: 'Food',
      splitWithAll: true,
      splitType: 'Equal',
      splits: members.map((m) => ({
        memberId: m.id,
        amount: 0,
        selected: true,
      })),
      notes: '',
      paidBy: user.id,
    });
  };

  const addExpense = (newExpData: Omit<Expense, 'id' | 'createdAt'>): string => {
    const newId = `exp-${Date.now()}`;
    const newExpense: Expense = {
      ...newExpData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // Push to Firestore if authenticated
    if (firebaseUser) {
      const path = `rooms/${DEFAULT_ROOM_ID}/expenses/${newId}`;
      setDoc(doc(db, 'rooms', DEFAULT_ROOM_ID, 'expenses', newId), newExpense).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }

    // Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New expense added',
      subtitle: `${newExpense.category} - ${roomDetails.currency}${newExpense.amount.toLocaleString()}`,
      timestamp: 'Just now',
      type: 'expense_added',
      read: false,
      relatedExpenseId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newId;
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) => {
      const updated = prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp));
      const target = updated.find((exp) => exp.id === id);
      if (firebaseUser && target) {
        const path = `rooms/${DEFAULT_ROOM_ID}/expenses/${id}`;
        setDoc(doc(db, 'rooms', DEFAULT_ROOM_ID, 'expenses', id), target, { merge: true }).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }
      return updated;
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    if (selectedExpenseId === id) {
      setSelectedExpenseId(null);
    }
    if (firebaseUser) {
      const path = `rooms/${DEFAULT_ROOM_ID}/expenses/${id}`;
      deleteDoc(doc(db, 'rooms', DEFAULT_ROOM_ID, 'expenses', id)).catch((err) => {
        handleFirestoreError(err, OperationType.DELETE, path);
      });
    }
  };

  const addMember = (name: string, email: string, phone?: string) => {
    const newMemberId = `m${Date.now()}`;
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    ];
    const newMember: Member = {
      id: newMemberId,
      name,
      email,
      phone: phone || '+91 99999 00000',
      avatar: avatarList[members.length % avatarList.length],
      isAdmin: false,
      joinDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setMembers((prev) => [...prev, newMember]);
    setRoomDetails((prev) => ({ ...prev, totalMembers: prev.totalMembers + 1 }));

    if (firebaseUser) {
      const path = `rooms/${DEFAULT_ROOM_ID}/members/${newMemberId}`;
      setDoc(doc(db, 'rooms', DEFAULT_ROOM_ID, 'members', newMemberId), newMember).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New roommate joined',
      subtitle: `${name} (${email})`,
      timestamp: 'Just now',
      type: 'member_added',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const removeMember = (id: string) => {
    if (id === user.id) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setRoomDetails((prev) => ({ ...prev, totalMembers: Math.max(1, prev.totalMembers - 1) }));
    if (firebaseUser) {
      const path = `rooms/${DEFAULT_ROOM_ID}/members/${id}`;
      deleteDoc(doc(db, 'rooms', DEFAULT_ROOM_ID, 'members', id)).catch((err) => {
        handleFirestoreError(err, OperationType.DELETE, path);
      });
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateRoomDetails = (updates: Partial<RoomDetails>) => {
    setRoomDetails((prev) => {
      const next = { ...prev, ...updates };
      if (firebaseUser) {
        const path = `rooms/${DEFAULT_ROOM_ID}`;
        setDoc(doc(db, 'rooms', DEFAULT_ROOM_ID), next, { merge: true }).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }
      return next;
    });
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setMembers(INITIAL_MEMBERS);
    setExpenses(INITIAL_EXPENSES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRoomDetails(INITIAL_ROOM_DETAILS);
    setSelectedExpenseId('exp-1');
    setCurrentScreen('home');
    setScreenHistory(['home']);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}user`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}members`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}expenses`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}notifications`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}roomDetails`);
  };

  // Computations
  const totalMonthlyExpenses = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const lastMonthExpenses = 11120;

  const categoryTotals: Record<string, number> = {};
  expenses.forEach((item) => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + Number(item.amount);
  });

  const categoryColorMap: Record<string, string> = {
    Rent: '#2563EB',
    Food: '#10B981',
    Electricity: '#F59E0B',
    Internet: '#8B5CF6',
    Maid: '#EC4899',
    Groceries: '#14B8A6',
    Water: '#06B6D4',
    Others: '#64748B',
  };

  const categoryBreakdown = Object.entries(categoryTotals).map(([cat, amount]) => ({
    category: cat,
    amount,
    percentage: totalMonthlyExpenses > 0 ? Math.round((amount / totalMonthlyExpenses) * 100) : 0,
    color: categoryColorMap[cat] || '#3B82F6',
  }));

  const monthlyExpenseTrend = [
    { month: 'Jun', amount: 9800 },
    { month: 'Jul', amount: 11120 },
    { month: 'Aug', amount: totalMonthlyExpenses },
    { month: 'Sep', amount: 10400 },
    { month: 'Oct', amount: 12200 },
  ];

  const memberBalances = members.map((m) => {
    let totalPaid = 0;
    let totalShare = 0;

    expenses.forEach((exp) => {
      if (exp.paidBy === m.id) {
        totalPaid += exp.amount;
      }
      const mySplit = exp.splits.find((s) => s.memberId === m.id && s.selected);
      if (mySplit) {
        totalShare += mySplit.amount;
      }
    });

    const netBalance = totalPaid - totalShare;

    return {
      member: m,
      totalPaid,
      totalShare,
      netBalance,
    };
  });

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigate,
        goBack,
        user,
        firebaseUser,
        isFirebaseConnected,
        loginWithGoogle,
        logoutUser,
        members,
        expenses,
        notifications,
        roomDetails,
        selectedExpenseId,
        setSelectedExpenseId,
        draftExpense,
        setDraftExpense,
        updateDraftExpense,
        resetDraftExpense,
        addExpense,
        updateExpense,
        deleteExpense,
        addMember,
        removeMember,
        markNotificationAsRead,
        markAllNotificationsRead,
        updateRoomDetails,
        resetDemoData,
        totalMonthlyExpenses,
        lastMonthExpenses,
        monthlyExpenseTrend,
        categoryBreakdown,
        memberBalances,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
