import { Member, Expense, AppNotification, RoomDetails, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'm1',
  name: 'Rohit Yadav',
  email: 'rohit2710@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isAdmin: true,
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Rohit (You)',
    email: 'rohit2710@gmail.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isAdmin: true,
    joinDate: '1 Jul 2025',
  },
  {
    id: 'm2',
    name: 'Amit',
    email: 'amit@gmail.com',
    phone: '+91 98111 22233',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isAdmin: false,
    joinDate: '1 Jul 2025',
  },
  {
    id: 'm3',
    name: 'Sahil',
    email: 'sahil@gmail.com',
    phone: '+91 98222 33344',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isAdmin: false,
    joinDate: '1 Jul 2025',
  },
  {
    id: 'm4',
    name: 'Vikash',
    email: 'vikash@gmail.com',
    phone: '+91 98333 44455',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    isAdmin: false,
    joinDate: '15 Jul 2025',
  },
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'Food',
    amount: 3200,
    date: '5 Aug 2025',
    category: 'Food',
    paidBy: 'm1', // Rohit
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 1067, selected: true },
      { memberId: 'm2', amount: 1067, selected: true },
      { memberId: 'm3', amount: 1066, selected: true },
      { memberId: 'm4', amount: 0, selected: false },
    ],
    notes: 'Dinner and groceries',
    createdAt: '2025-08-05T10:24:00Z',
  },
  {
    id: 'exp-2',
    title: 'Electricity',
    amount: 1200,
    date: '3 Aug 2025',
    category: 'Electricity',
    paidBy: 'm2', // Amit
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 300, selected: true },
      { memberId: 'm2', amount: 300, selected: true },
      { memberId: 'm3', amount: 300, selected: true },
      { memberId: 'm4', amount: 300, selected: true },
    ],
    notes: 'July electricity bill',
    createdAt: '2025-08-03T20:15:00Z',
  },
  {
    id: 'exp-3',
    title: 'Internet',
    amount: 800,
    date: '28 Jul 2025',
    category: 'Internet',
    paidBy: 'm3', // Sahil
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 200, selected: true },
      { memberId: 'm2', amount: 200, selected: true },
      { memberId: 'm3', amount: 200, selected: true },
      { memberId: 'm4', amount: 200, selected: true },
    ],
    notes: 'Fiber broadband monthly plan',
    createdAt: '2025-07-28T14:00:00Z',
  },
  {
    id: 'exp-4',
    title: 'Room Rent',
    amount: 4980,
    date: '1 Aug 2025',
    category: 'Rent',
    paidBy: 'm1', // Rohit
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 1245, selected: true },
      { memberId: 'm2', amount: 1245, selected: true },
      { memberId: 'm3', amount: 1245, selected: true },
      { memberId: 'm4', amount: 1245, selected: true },
    ],
    notes: 'Monthly advance rent share',
    createdAt: '2025-08-01T09:00:00Z',
  },
  {
    id: 'exp-5',
    title: 'Maid & Cleaning',
    amount: 1500,
    date: '2 Aug 2025',
    category: 'Maid',
    paidBy: 'm4', // Vikash
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 375, selected: true },
      { memberId: 'm2', amount: 375, selected: true },
      { memberId: 'm3', amount: 375, selected: true },
      { memberId: 'm4', amount: 375, selected: true },
    ],
    notes: 'Monthly cleaning & kitchen maintenance',
    createdAt: '2025-08-02T11:30:00Z',
  },
  {
    id: 'exp-6',
    title: 'Water Cans & Snacks',
    amount: 770,
    date: '4 Aug 2025',
    category: 'Others',
    paidBy: 'm3', // Sahil
    splitType: 'Equal',
    splits: [
      { memberId: 'm1', amount: 192.5, selected: true },
      { memberId: 'm2', amount: 192.5, selected: true },
      { memberId: 'm3', amount: 192.5, selected: true },
      { memberId: 'm4', amount: 192.5, selected: true },
    ],
    notes: 'Bisleri 20L jars + evening snacks',
    createdAt: '2025-08-04T18:45:00Z',
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New expense added',
    subtitle: 'Food - ₹3,200',
    timestamp: '5 Aug 2025, 10:24 AM',
    type: 'expense_added',
    read: false,
    relatedExpenseId: 'exp-1',
  },
  {
    id: 'notif-2',
    title: 'Expense split',
    subtitle: 'Electricity - ₹1,200',
    timestamp: '3 Aug 2025, 08:15 PM',
    type: 'expense_split',
    read: false,
    relatedExpenseId: 'exp-2',
  },
  {
    id: 'notif-3',
    title: 'You were added to the room',
    subtitle: 'By Amit',
    timestamp: '1 Aug 2025, 02:30 PM',
    type: 'member_added',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Monthly report ready',
    subtitle: 'Your July report is ready',
    timestamp: '31 Jul 2025, 09:00 AM',
    type: 'report_ready',
    read: true,
  },
];

export const INITIAL_ROOM_DETAILS: RoomDetails = {
  name: 'The Boys Hostel',
  totalMembers: 4,
  monthlyBudget: 15000,
  joinDate: '1 Jul 2025',
  currency: '₹',
  currencyCode: 'INR',
  language: 'English',
};
