export type ScreenType =
  | 'splash'
  | 'login'
  | 'signup'
  | 'home'
  | 'add-expense'
  | 'split-expense'
  | 'expense-details'
  | 'members'
  | 'reports'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'add-member'
  | 'edit-expense'
  | 'success'
  | 'all-expenses';

export type ExpenseCategory =
  | 'Food'
  | 'Electricity'
  | 'Internet'
  | 'Rent'
  | 'Groceries'
  | 'Maid'
  | 'Water'
  | 'Others';

export type SplitType = 'Equal' | 'Custom' | 'Percentage';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  isAdmin?: boolean;
  joinDate: string;
}

export interface SplitMemberShare {
  memberId: string;
  amount: number;
  percentage?: number;
  selected: boolean;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string; // e.g. "5 Aug 2025" or "2025-08-05"
  category: ExpenseCategory;
  paidBy: string; // memberId
  splitType: SplitType;
  splits: SplitMemberShare[];
  notes?: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'expense_added' | 'expense_split' | 'member_added' | 'report_ready';
  read: boolean;
  relatedExpenseId?: string;
}

export interface RoomDetails {
  name: string;
  totalMembers: number;
  monthlyBudget: number;
  joinDate: string;
  currency: string;
  currencyCode: string;
  language: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}
